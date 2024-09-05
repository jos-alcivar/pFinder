import PropTypes from "prop-types";
import googleLogo from "../../assets/img/logo-google.png";
import "./style.css";

export function ButtonSSO({ label }) {
  const handleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };
  return (
    <a className="sso-btn" role="button" onClick={handleLogin}>
      <img className="logo-img" src={googleLogo} alt="Google Logo" />
      <div className="logo-text">{label}</div>
    </a>
  );
}

ButtonSSO.propTypes = {
  label: PropTypes.string,
};
