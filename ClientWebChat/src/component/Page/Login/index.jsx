import clsx from "clsx";
import styles from "./Login.module.scss";
import Button from "../../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
//cần 3 div thì phải
function Login() {
  const username = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  function handleEnter(e) {
    if (e.key === "Enter") {
      console.log(username.current.value, password.current.value);
      //thực hiện fetch để check tài khoản
      navigate("/home"); //giúp chuyển trang
    }
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

        <Button to="/home">
          <h4 className={clsx(styles.btn)}>Login</h4>
        </Button>
      </div>
    </div>
  );
}

export default Login;
