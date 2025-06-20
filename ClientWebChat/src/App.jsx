import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import clsx from "clsx";

import Home from "./component/Page/Home";
import Chat from "./component/Page/Chat";
function App() {
  return (
    <Router>
      <div className={clsx("App")}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
