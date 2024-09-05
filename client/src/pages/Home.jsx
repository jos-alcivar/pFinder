import mainLogo from "../assets/img/logo.png";
import Header from "../layout/Header";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="app-ctn">
      <Header />
      <div className="body-ctn">
        <div className="content-ctn">
          <div className="logo-ctn">
            <img className="logo-img" src={mainLogo} alt="pFinder logo"></img>
            <div className="logo-heading">pFinder</div>
            <div className="logo-text">
              Your next role is closer that you think
            </div>
          </div>
          <div className="btn-ctn">
            <button
              className="register-btn"
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </button>
            <button
              className="login-btn"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
