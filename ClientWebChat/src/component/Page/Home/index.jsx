import clsx from "clsx";
import styles from "./Home.module.scss";
//cần 3 div thì phải
function Home() {
  return (
    <div className={clsx(styles.wrapper)}>
      <header className={clsx(styles.header)}>
        <div className={clsx(styles.avatar)}>
          <img
            src="\src\assets\noimage.png"
            alt="avatar"
            className={clsx(styles.avatar)}
          />
        </div>
      </header>

      <div className={clsx(styles.container)}>
        <div className={clsx(styles.listUser)}>
          <header className={clsx(styles.headerListUser)}></header>
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
