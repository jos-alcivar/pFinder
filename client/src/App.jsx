import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Post from "./pages/Post";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Reports from "./pages/Reports";
import Account from "./pages/Account";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/posts" element={<Post />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
