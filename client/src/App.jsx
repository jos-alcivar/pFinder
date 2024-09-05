import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Account from "./pages/Account";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Post from "./pages/Post";
import Register from "./pages/Register";
import Reports from "./pages/Reports";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/posts" element={<Post />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
