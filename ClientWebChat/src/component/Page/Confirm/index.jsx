import clsx from "clsx";
import styles from "./Confirm.module.scss";
import Button from "../../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShield,
  faToiletPaperSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../../UserProvider";
function Confirm() {
  const navigate = useNavigate();
  const code = useRef(null);
  const { userCurrent, setUserCurrent } = useUser();
  function handleClickSendAgain() {
    fetch("http://127.0.0.1:5000/api/users/confirm-user-send-again", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userCurrent.user,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.status === 500) toast.error(data.error);
        else if (res.status === 200) {
          toast.success("Đã gửi lại mã thành công");
        }
      })
      .catch((err) => console.log(err));
  }
  function handleOk() {
    fetch("http://127.0.0.1:5000/api/users/confirm-user-ok", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userCurrent.user,
        code: code.current.value.trim(),
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.status === 200) {
          toast.success("Xác thực tài khoản thành công");
          setTimeout(() => {
            navigate("/home");
          }, 1000);
        } else if (res.status === 500) {
          toast.error(data.error);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={clsx(styles.wrapper)}>
      <div className={clsx(styles.container)}>
        <header className={clsx(styles.header)}>
          <h1>Confirm</h1>
        </header>

        <div className={clsx(styles.content)}>
          <div className={clsx(styles.row)}>
            <input
              type="confirm"
              placeholder="Nhập code xác thực vào đây!"
              className={clsx(styles.code)}
              ref={code}
            />
            <FontAwesomeIcon icon={faShield} className={clsx(styles.icon)} />
          </div>

          <div
            className={clsx(styles.sendAgain)}
            onClick={handleClickSendAgain}
          >
            Gửi lại
          </div>
        </div>

        <Button onClick={handleOk}>
          <h4 className={clsx(styles.btn)}>OK!</h4>
        </Button>
      </div>
    </div>
  );
}

export default Confirm;
