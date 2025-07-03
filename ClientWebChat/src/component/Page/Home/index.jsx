import clsx from "clsx";
import styles from "./Home.module.scss";
import Button from "../../Button";
import Logo from "../../Logo";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useUser } from "../../UserProvider";

function Home() {
  const navigate = useNavigate();
  const input = useRef(null);
  const { userCurrent, setUserCurrent } = useUser();
  const [avatar, setAvatar] = useState("\\src\\assets\\noimage.png");
  const prevAvatar = useRef(null);

  function handleClickLogo() {
    window.location.href = "/home";
  }
  function handleChangeAvatar() {
    input.current.click();
  }
  function handleLogout() {
    setUserCurrent({ user: "", pass: "" });
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

  useEffect(() => {
    return () => {
      if (prevAvatar.current) URL.revokeObjectURL(prevAvatar.current);
    };
  }, []);

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

  const listUser = [];

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
              type="search"
              className={clsx(styles.search)}
            />
          </header>
          <div className={clsx(styles.user)}></div>
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
