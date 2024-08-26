import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Post from "./pages/Post";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Post />} />
          <Route path="/jobs" element={<Jobs />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
