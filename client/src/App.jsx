import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Post from "./pages/Post";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<Post />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
