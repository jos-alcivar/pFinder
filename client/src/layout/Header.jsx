import PropTypes from "prop-types";

function Header(props) {
  return (
    <div className="header-ctn">
      <label className="header-text">{props.title}</label>
    </div>
  );
}

export default Header;

Header.propTypes = {
  title: PropTypes.string,
};
