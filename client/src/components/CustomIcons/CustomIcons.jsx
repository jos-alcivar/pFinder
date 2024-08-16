import PropTypes from "prop-types";
import Account from "../../assets/icons/account.svg";
import Add from "../../assets/icons/add.svg";
import Jobs from "../../assets/icons/jobs.svg";
import Logo from "../../assets/icons/logo.svg";
import Report from "../../assets/icons/report.svg";
import Search from "../../assets/icons/search.svg";
import "./style.css";

const icons = {
  account: Account,
  posts: Add,
  jobs: Jobs,
  logo: Logo,
  reports: Report,
  search: Search,
};

const CustomIcons = ({ label }) => {
  const Icon = icons[label];

  return (
    <>
      {Icon ? (
        <img src={Icon} alt={`${label} icon`} />
      ) : (
        <span>Icon not found</span>
      )}
    </>
  );
};

export default CustomIcons;

CustomIcons.propTypes = {
  label: PropTypes.string,
};
