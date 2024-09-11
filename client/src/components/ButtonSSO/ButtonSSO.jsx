import PropTypes from "prop-types";
import googleLogo from "../../assets/img/logo-google.png";
import "./style.css";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export function ButtonSSO({ label }) {
  const handleLogin = () => {
    window.location.href = `${apiBaseUrl}/auth/google`;
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
