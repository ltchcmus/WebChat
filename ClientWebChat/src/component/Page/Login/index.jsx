import clsx from "clsx";
import styles from "./Login.module.scss";
import Button from "../../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../UserProvider";
import { toast } from "react-toastify";

function Login() {
  const username = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const { userCurrent, setUserCurrent } = useUser();
  function handleLogin() {
    fetch("http://127.0.0.1:5000/api/users/login-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.current.value.trim(),
        password: password.current.value.trim(),
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.status == 500) {
          toast.error(data.error);
          return;
        } else if (res.status === 200) {
          toast.success("Đăng nhập thành công");
          setUserCurrent({
            user: username.current.value.trim(),
            pass: password.current.value.trim(),
          });
          if (data.isvalid) {
            setTimeout(() => {
              navigate("/home");
            }, 500);
          } else {
            setTimeout(() => {
              navigate("/confirm");
              toast.warn("Tài khoản chưa xác thực, vui lòng xác thực");
            }, 500);
          }
        }
      })
      .catch((err) => console.log(err));
  }

  function handleEnter(e) {
    if (e.key === "Enter") {
      handleLogin();
    }
  }

  function handleClickLogin() {
    handleLogin();
  }

  return (
    <div className={clsx(styles.wrapper)} onKeyDown={handleEnter}>
      <div className={clsx(styles.container)}>
        <header className={clsx(styles.header)}>
          <h1>Login</h1>
        </header>

        <div className={clsx(styles.content)}>
          <div className={clsx(styles.rowUserName)}>
            <input
              ref={username}
              type="text"
              placeholder="Username"
              className={clsx(styles.username)}
            />
            <FontAwesomeIcon
              icon={faUser}
              className={clsx(styles.iconUserName)}
            />
          </div>

          <div className={clsx(styles.rowPassWord)}>
            <input
              ref={password}
              type="password"
              placeholder="Password"
              className={clsx(styles.password)}
            />
            <FontAwesomeIcon
              icon={faLock}
              className={clsx(styles.iconPassWord)}
            />
          </div>
        </div>

        <Button onClick={handleClickLogin}>
          <h4 className={clsx(styles.btn)}>Login</h4>
        </Button>

        <div className={clsx(styles.textLine)}>
          <span className={clsx(styles.text)}>not a member ?</span>
          <Link to="/signup" className={clsx(styles.textSignup)}>
            Sign up now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
