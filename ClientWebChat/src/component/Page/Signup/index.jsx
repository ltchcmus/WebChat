import clsx from "clsx";
import styles from "./Signup.module.scss";
import Button from "../../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const username = useRef(null);
  const password = useRef(null);
  const email = useRef(null);
  const navigate = useNavigate();
  function handleEnter(e) {
    if (e.key === "Enter") {
      console.log(
        username.current.value,
        password.current.value,
        email.current.value
      );
      //thực hiện fetch để check tài khoản
    }
  }
  return (
    <div className={clsx(styles.wrapper)} onKeyDown={handleEnter}>
      <div className={clsx(styles.container)}>
        <header className={clsx(styles.header)}>
          <h1>Sign up</h1>
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

          <div className={clsx(styles.rowEmail)}>
            <input
              type="email"
              ref={email}
              placeholder="Email"
              className={clsx(styles.email)}
            />
            <FontAwesomeIcon
              icon={faEnvelope}
              className={clsx(styles.iconEmail)}
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

        <Button>
          <h4 className={clsx(styles.btn)}>Sign up</h4>
        </Button>
      </div>
    </div>
  );
}

export default Signup;
