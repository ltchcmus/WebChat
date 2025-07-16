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
  const { userCurrent, setUserCurrent } = useUser();
  const navigate = useNavigate();

  if (!userCurrent.user) navigate("/");

  const input = useRef(null);
  const [avatar, setAvatar] = useState(null);
  const prevAvatar = useRef(null);
  const [searchText, setSearchText] = useState("");
  const valueInputSearch = useDebounce(searchText);
  const [listUsersSearch, setListUsersSearch] = useState([]);
  const refSearchText = useRef(null);
  const { listUser, setListUser } = useListUser();
  const user2 = useRef(null);
  const socket = useRef(null);
  const [listMessageChat, setListMessageChat] = useState([]);
  const inputChat = useRef(null);
  const refscroll = useRef(null);

  useEffect(() => {
    if (!userCurrent.user) return;

    if (socket.current?.connected) return;

    socket.current = io("http://127.0.0.1:5000", {
      transports: ["websocket", "polling"],
      auth: { token: userCurrent.user },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    socket.current.on("receive_message", (obj) => {
      setListMessageChat((prev) => [...prev, obj]);
    });

    return () => {
      if (socket.current) {
        socket.current.removeAllListeners();
        socket.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/users/get-all").then(async (res) => {
      const data = await res.json();
      if (res.status === 200) {
        setListUser(data.data.filter((value) => value !== userCurrent.user));
      } else {
        toast.error("Nhận dữ liệu lỗi");
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
    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("avatar", file);
        formData.append("username", userCurrent.user);
        fetch("http://127.0.0.1:5000/api/avatar/update", {
          method: "POST",
          body: formData,
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
    setSearchText(e.target.value.trim());
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
          if (res.status === 200) {
            setListUsersSearch(data.data);
          } else {
            toast.error("Error khi nhan du lieu");
          }
        })
        .catch((err) => toast.error(err));
    }
  }, [valueInputSearch]);

  const listButton = [
    { content: "Thay đổi avatar", click: handleChangeAvatar },
    { content: "Đăng xuất", click: handleLogout },
  ];

  function handleClickUser(user) {
    user2.current = user;
    fetch("http://127.0.0.1:5000/api/message/get", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ username1: userCurrent.user, username2: user }),
    }).then(async (res) => {
      const data = await res.json();
      if (res.status === 200) {
        setListMessageChat(data.data);
      }
    });
  }

  function handleClickClose() {
    user2.current = null;
    setListMessageChat([]);
  }

  function handleSendMessage(user) {
    const msg = inputChat.current.value;
    if (!msg) return;
    fetch("http://127.0.0.1:5000/api/message/add", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        username1: userCurrent.user,
        username2: user,
        mess: msg,
      }),
    }).then(async (res) => {
      if (res.status === 200) {
        socket.current.emit("private_Message", {
          sender: userCurrent.user,
          receive: user,
          mess: msg,
        });
        setListMessageChat((prev) => [
          ...prev,
          { user: userCurrent.user, data: msg },
        ]);
        inputChat.current.value = "";
        inputChat.current.focus();
      }
    });
  }

  useEffect(() => {
    refscroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [listMessageChat]);

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
            <label htmlFor="listUser-search">Tìm kiếm</label>
            <input
              id="listUser-search"
              ref={refSearchText}
              type="search"
              className={clsx(styles.search)}
              onChange={handleChangeInput}
            />
            {listUsersSearch.length > 0 &&
              valueInputSearch.length > 0 &&
              document.activeElement === refSearchText.current && (
                <div
                  className={clsx(styles.listSearch)}
                  style={{ height: listUsersSearch.length * 25 }}
                >
                  {listUsersSearch.map((user, index) => (
                    <User
                      key={index}
                      avatar
                      username={user}
                      onClick={() => handleClickUser(user)}
                    >
                      {user}
                    </User>
                  ))}
                </div>
              )}
          </header>
          <div className={clsx(styles.user)}>
            {listUser.map((user, index) => (
              <User
                key={index}
                avatar
                username={user}
                onClick={() => handleClickUser(user)}
              >
                {user}
              </User>
            ))}
          </div>
        </div>

        <div className={clsx(styles.frameChat)}>
          {user2.current && (
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
                {listMessageChat.map((value, index) =>
                  value.user === userCurrent.user ? (
                    <Message user2 key={index}>
                      {value.data}
                    </Message>
                  ) : (
                    <Message key={index} avatar={value.user}>
                      {value.data}
                    </Message>
                  )
                )}
                <div ref={refscroll}></div>
              </div>

              <div className={clsx(styles.frameInputChat)}>
                <FontAwesomeIcon
                  icon={faImage}
                  className={clsx(styles.Image)}
                />
                <div className={clsx(styles.slipt)}></div>
                <div
                  className={clsx(styles.FrameContentChat)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendMessage(user2.current);
                  }}
                >
                  <input
                    type="text"
                    className={clsx(styles.contentChat)}
                    placeholder="content"
                    ref={inputChat}
                  />
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    className={clsx(styles.iconSend)}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleSendMessage(user2.current);
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
