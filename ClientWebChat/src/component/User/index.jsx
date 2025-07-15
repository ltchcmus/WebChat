import clsx from "clsx";
import styles from "./User.module.scss";
function User({ height, width, children, avatar, username, ...props }) {
  return (
    <div className={clsx(styles.wrapper)}>
      <div
        {...props}
        style={{ height: height || 25, width: width || 50 }}
        className={clsx(styles.user)}
      >
        {avatar && (
          <img
            className={clsx(styles.avatar)}
            src={`http://127.0.0.1:5000/api/avatar/get/q=${encodeURIComponent(
              username
            )}`}
            alt="avatar"
          />
        )}
        {children}
      </div>
    </div>
  );
}
export default User;
