import PropTypes from "prop-types";
import googleLogo from "../../assets/img/logo-google.png";
import "./style.css";

export function ButtonSSO({ label }) {
  return (
    <a className="sso-btn" role="button" href="/auth/google">
      <img className="logo-img" src={googleLogo} alt="Google Logo" />
      <div className="logo-text">{label}</div>
    </a>
  );
}

ButtonSSO.propTypes = {
  label: PropTypes.string,
};
