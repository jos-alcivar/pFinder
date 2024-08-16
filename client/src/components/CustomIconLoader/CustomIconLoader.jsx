import PropTypes from "prop-types";
import { Add, Account, Jobs, Logo, Report, Search } from "../CustomIcons";
import "./style.css";

const icons = {
  account: Account,
  jobs: Jobs,
  logo: Logo,
  posts: Add,
  reports: Report,
  search: Search,
};

const CustomIconLoader = ({ label, size, fill, stroke }) => {
  const Icon = icons[label];

  return (
    <>
      {Icon ? (
        <Icon
          aria-label={`${label} icon`}
          height={size}
          width={size}
          fill={fill}
          stroke={stroke}
        />
      ) : (
        <span>Icon not found</span>
      )}
    </>
  );
};

export default CustomIconLoader;

CustomIconLoader.propTypes = {
  fill: PropTypes.string,
  label: PropTypes.string.isRequired,
  size: PropTypes.string,
  stroke: PropTypes.string,
};
