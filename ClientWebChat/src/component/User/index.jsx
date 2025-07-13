import clsx from "clsx";
import styles from "./User.module.scss";
function User({ height, width, children, ...props }) {
  return (
    <div
      {...props}
      style={{ height: height || 25, width: width || 50 }}
      className={clsx(styles.user)}
    >
      {children}
    </div>
  );
}
export default User;
