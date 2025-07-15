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

function Home() {
  const navigate = useNavigate();
  const input = useRef(null);
  const { userCurrent, setUserCurrent } = useUser();
  const [avatar, setAvatar] = useState("\\src\\assets\\noimage.png");
  const prevAvatar = useRef(null);
  const [searchText, setSearchText] = useState("");
  const valueInputSearch = useDebounce(searchText);
  const [listUsersSearch, setListUsersSearch] = useState([]);
  const refSearchText = useRef(null);
  const { listUser, setListUser } = useListUser();
  const socket = useRef(null);

  console.log(userCurrent.user);

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
    const file = e.target.files[0];
    if (file) {
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

  return (
    <div className={clsx(styles.wrapper)}>
      <header className={clsx(styles.header)}>
        <Logo className={clsx(styles.logo)} onClick={handleClickLogo} />
        <div className={clsx(styles.avatarFrame)}>
          <img src={avatar} alt="avatar" className={clsx(styles.avatar)} />

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
            document.activeElement == refSearchText.current ? (
              <div
                className={clsx(styles.listSearch)}
                style={{ height: listUsersSearch.length * 25 }}
              >
                {listUsersSearch.map((user, index) => {
                  return <User key={index}>{user}</User>;
                })}
              </div>
            ) : (
              ""
            )}
          </header>
          <div className={clsx(styles.user)}>
            {listUser.map((user, index) => {
              return <User key={index}>{user}</User>;
            })}
          </div>
        </div>

        <div className={clsx(styles.frameChat)}>
          <header className={clsx(styles.headerFrameChat)}></header>
          <div className={styles.frame}></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
