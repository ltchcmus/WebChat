import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import clsx from "clsx";
import styles from "./App.module.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Background from "./component/Background";
import Home from "./component/Page/Home";
import Login from "./component/Page/Login";
import Chat from "./component/Page/Chat";
import Signup from "./component/Page/Signup";

function App() {
  return (
    <Router>
      <div className={clsx(styles.App)}>
        <div className={clsx(styles.background)}>{<Background />}</div>
        <div className={clsx(styles.contentWrapper)}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
        <ToastContainer autoClose={2000} />
      </div>
    </Router>
  );
}

export default App;
