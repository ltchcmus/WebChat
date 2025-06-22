import clsx from "clsx";
import styles from "./Home.module.scss";
//cần 3 div thì phải
function Home() {
  return (
    <div className={clsx(styles.wrapper)}>
      <h1>Hello Home</h1>
    </div>
  );
}

export default Home;
