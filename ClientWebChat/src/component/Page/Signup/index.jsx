import clsx from "clsx";
import styles from "./Signup.module.scss";
import Button from "../../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import validator from "validator";
import { useUser } from "../../UserProvider";
import { toast } from "react-toastify";
function Signup() {
  const username = useRef(null);
  const password = useRef(null);
  const email = useRef(null);
  const { userCurrent, setUserCurrent } = useUser();
  const navigate = useNavigate();
  function isValidUsername(username) {
    const regex = /^[a-zA-Z0-9]{8,12}$/;
    return regex.test(username);
  }

  function isValidPassword(password) {
    return /^.{8,20}$/.test(password);
  }

  function isEmail(email) {
    return validator.isEmail(email);
  }

  function createAccount() {
    let ok = true;
    const user = username.current.value.trim();
    if (!isValidUsername(user)) {
      toast.error("Username phải từ 8-12 kí tự không chứ các kí tự đặc biệt");
      ok = false;
    }
    const pass = password.current.value.trim();

    if (!isValidPassword(pass)) {
      toast.error(
        "Password phải từ 8-20 kí tự và có thể chứa các kí tự đặc biệt"
      );
      ok = false;
    }
    const e = email.current.value.trim();
    if (!isEmail(e)) {
      toast.error("Email không hợp lệ");
      ok = false;
    }

    if (!ok) return;

    fetch("http://127.0.0.1:5000/api/users/create-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user,
        email: e,
        password: pass,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.status === 200) {
          setUserCurrent({
            user: user,
            pass: pass,
          });

          navigate("/confirm");
        } else if (res.status === 500) {
          toast.error(data.error);
          return;
        }
      })
      .catch((err) => console.error(err));
  }

  function handleEnter(e) {
    if (e.key === "Enter") {
      createAccount();
      //thực hiện fetch để check tài khoản
    }
  }

  function handleSignup(e) {
    createAccount();
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

        <Button onClick={handleSignup} className={styles.addClassName}>
          Sign up
        </Button>
      </div>
    </div>
  );
}

export default Signup;
