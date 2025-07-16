import clsx from "clsx";
import styles from "./Home.module.scss";
import Button from "../../Button";
import Logo from "../../Logo";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useUser } from "../../UserProvider";
import useDebounce from "../../UseDebounce";
import { toast } from "react-toastify";
import User from "../../User";
import { useListUser } from "../../ListUserProvider";
import { io } from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faPaperPlane,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Message from "../../Message";

function Home() {
  const navigate = useNavigate();
  const input = useRef(null);
  const { userCurrent, setUserCurrent } = useUser();
  const [avatar, setAvatar] = useState(null);
  const prevAvatar = useRef(null);
  const [searchText, setSearchText] = useState("");
  const valueInputSearch = useDebounce(searchText);
  const [listUsersSearch, setListUsersSearch] = useState([]);
  const refSearchText = useRef(null);
  const { listUser, setListUser } = useListUser();
  const [onFrameChat, setonFrameChat] = useState(false);
  const user2 = useRef(null);
  const socket = useRef(null);
  const listMessageChat = useRef([]);

  useEffect(() => {
    console.log("🔌 Attempting to connect to Socket.IO");

    if (!userCurrent.user) {
      console.log("❌ No user token");
      return;
    }

    // Tránh tạo connection mới nếu đã có
    if (socket.current?.connected) {
      console.log("✅ Socket already connected");
      return;
    }

    socket.current = io("http://127.0.0.1:5000", {
      transports: ["websocket", "polling"],
      auth: {
        token: userCurrent.user,
      },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    socket.current.on("connect", () => {
      console.log("✅ Connected to Socket.IO server");
      console.log("🔑 Socket ID:", socket.current.id);
    });

    socket.current.on("connect_response", (data) => {
      console.log("📨 Server response:", data);
    });

    socket.current.on("connect_error", (error) => {
      console.error("❌ Connection error:", error);
      console.log("🔄 Trying to reconnect...");
    });

    socket.current.on("disconnect", (reason) => {
      console.log("🔌 Disconnected:", reason);
    });

    return () => {
      if (socket.current) {
        console.log("🧹 Cleaning up socket connection");
        socket.current.removeAllListeners();
        socket.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/users/get-all").then(async (res) => {
      const data = await res.json();
      if (res.status === 500) {
        toast.error("Nhận dữ liệu lỗi");
      } else if (res.status === 200) {
        setListUser(
          data.data.filter((value) => {
            return value != userCurrent.user;
          })
        );
      }
    });
  }, []);

  function handleClickLogo() {
    window.location.href = "/home";
  }
  function handleChangeAvatar() {
    input.current.click();
  }
  function handleLogout() {
    setUserCurrent({ user: "", pass: "" });
    localStorage.removeItem("userCurrent");
    window.location.href = "/";
  }

  function handleHidden(e) {
    const file = e.target.files[0]; // ảnh thật (binary)
    if (file) {
      try {
        const formData = new FormData();
        formData.append("avatar", file);
        formData.append("username", userCurrent.user);
        fetch("http://127.0.0.1:5000/api/avatar/update", {
          method: "POST",
          body: formData,
        }).then(async (res) => {
          const data = await res.json();
          if (res.status === 500) {
            console.log(data.message);
          } else if (res.status === 400) {
            console.log(data.error);
          } else if (res.status === 200) {
          }
        });
      } catch (err) {
        console.log("Lưu ảnh thất bại");
      }
      if (prevAvatar.current) URL.revokeObjectURL(prevAvatar.current);
      const url = URL.createObjectURL(file);
      prevAvatar.current = url;
      setAvatar(url);
    }
  }

  function handleChangeInput(e) {
    const inp = e.target.value.trim();
    setSearchText(inp);
  }

  useEffect(() => {
    const val = valueInputSearch.trim();
    if (val) {
      fetch(
        `http://127.0.0.1:5000/api/users/search-user/q=${encodeURIComponent(
          val
        )}`
      )
        .then(async (res) => {
          const data = await res.json();
          if (res.status === 500) {
            toast.error("Error khi nhan du lieu");
          } else if (res.status === 200) {
            setListUsersSearch(data.data);
          }
        })
        .catch((err) => toast.error(err));
    }
  }, [valueInputSearch]);

  const listButton = [
    {
      content: "Thay đổi avatar",
      click: handleChangeAvatar,
    },
    {
      content: "Đăng xuất",
      click: handleLogout,
    },
  ];

  function handleClickUser(user) {
    user2.current = user;
    fetch("http://127.0.0.1:5000/api/message/get", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username1: userCurrent.user,
        username2: user,
      }),
    }).then(async (res) => {
      const data = await res.json();
      if (res.status === 500) {
        console.log(data.error);
      } else if (res.status === 200) {
        listMessageChat.current = data.data;
        setonFrameChat(true);
      }
    });
  }

  function handleClickClose() {
    user2.current = null;
    setonFrameChat(false);
  }

  return (
    <div className={clsx(styles.wrapper)}>
      <header className={clsx(styles.header)}>
        <Logo className={clsx(styles.logo)} onClick={handleClickLogo} />
        <div className={clsx(styles.avatarFrame)}>
          <img
            src={
              avatar ||
              `http://127.0.0.1:5000/api/avatar/get/q=${encodeURIComponent(
                userCurrent.user
              )}`
            }
            alt="avatar"
            className={clsx(styles.avatar)}
          />

          <div className={clsx(styles.settings)}>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              ref={input}
              onChange={handleHidden}
            />

            {listButton.map((value, index) => (
              <Button onClick={value.click} key={index}>
                <span className={clsx(styles.btn)}>{value.content}</span>
              </Button>
            ))}
          </div>
        </div>
      </header>

      <div className={clsx(styles.container)}>
        <div className={clsx(styles.listUser)}>
          <header className={clsx(styles.headerListUser)}>
            <label htmlFor="listUser-search"> Tìm kiếm </label>
            <input
              id="listUser-search"
              ref={refSearchText}
              type="search"
              className={clsx(styles.search)}
              onChange={handleChangeInput}
            />

            {listUsersSearch.length > 0 &&
              valueInputSearch.length > 0 &&
              document.activeElement == refSearchText.current && (
                <div
                  className={clsx(styles.listSearch)}
                  style={{ height: listUsersSearch.length * 25 }}
                >
                  {listUsersSearch.map((user, index) => {
                    return (
                      <User key={index} avatar username={user}>
                        {user}
                      </User>
                    );
                  })}
                </div>
              )}
          </header>
          <div className={clsx(styles.user)}>
            {listUser.map((user, index) => {
              return (
                <User
                  key={index}
                  avatar
                  username={user}
                  onClick={() => handleClickUser(user)}
                >
                  {user}
                </User>
              );
            })}
          </div>
        </div>

        {
          <div className={clsx(styles.frameChat)}>
            {onFrameChat && (
              <div className={clsx(styles.frame)}>
                <header className={clsx(styles.headerFrameChat)}>
                  <img
                    src={`http://127.0.0.1:5000/api/avatar/get/q=${encodeURIComponent(
                      user2.current
                    )}`}
                    className={clsx(styles.avatarFrameChat)}
                    alt="avatar"
                  />
                  <h1 className={clsx(styles.UserName2)}>{user2.current}</h1>
                  <h1 className={clsx(styles.optionHeaderFrameChat)}>...</h1>
                  <FontAwesomeIcon
                    icon={faXmark}
                    className={clsx(styles.close)}
                    onClick={handleClickClose}
                  />
                </header>

                <div className={clsx(styles.bodyFrameChat)}>
                  {listMessageChat.current.map((value, index) => {
                    if (value.user === userCurrent.user)
                      return (
                        <Message user2 key={index}>
                          {value.mess}
                        </Message>
                      );
                    return (
                      <Message key={index} avatar={value.user}>
                        {value.mess}
                      </Message>
                    );
                  })}
                  <Message avatar="ltc11111" user1>
                    Lê Thành
                    Côngaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                  </Message>
                  <Message avatar="ltc11111" user1>
                    Lê Thành
                    Côngaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                  </Message>
                  <Message user2>
                    Lê Thành
                    Côngaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                  </Message>
                </div>

                <div className={clsx(styles.frameInputChat)}>
                  <FontAwesomeIcon
                    icon={faImage}
                    className={clsx(styles.Image)}
                  />
                  <div className={clsx(styles.slipt)}></div>

                  <div className={clsx(styles.FrameContentChat)}>
                    <input
                      type="text"
                      className={clsx(styles.contentChat)}
                      placeholder="content"
                    />

                    <FontAwesomeIcon
                      icon={faPaperPlane}
                      className={clsx(styles.iconSend)}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        }
      </div>
    </div>
  );
}

export default Home;
