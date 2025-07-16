import clsx from "clsx";
import styles from "./Message.module.scss";
import { Fragment } from "react";
function Message({
  children,
  avatar,
  className1,
  className2,
  user1,
  user2,
  ...props
}) {
  return (
    <Fragment>
      <div
        {...props}
        className={clsx(styles.wrapper, {
          [styles.wrapper2]: user2,
        })}
      >
        {avatar && (
          <img
            className={clsx(styles.avatar, className1)}
            src={`http://127.0.0.1:5000/api/avatar/get/q=${avatar}`}
            alt="avatar"
          />
        )}
        <div className={clsx(styles.content, className2)}>{children}</div>
      </div>
    </Fragment>
  );
}

export default Message;
