import clsx from "clsx";
import styles from "./Message.module.scss";
function Message({ children, avatar, className1, className2, ...props }) {
  return (
    <div {...props} className={clsx(styles.wrapper)}>
      {avatar && (
        <img
          className={clsx(styles.avatar, className1)}
          src={avatar}
          alt="avatar"
        />
      )}
      <div classNama={clsx(styles.content, className2)}>{children}</div>
    </div>
  );
}

export default Message;
