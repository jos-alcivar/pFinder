import PropTypes from "prop-types";
import {
  Post,
  Account,
  Jobs,
  Logo,
  Report,
  Search,
  Clear,
  Edit,
  Add,
} from "../CustomIcons";
import "./style.css";

const icons = {
  account: Account,
  jobs: Jobs,
  logo: Logo,
  posts: Post,
  reports: Report,
  search: Search,
  add: Add,
  clear: Clear,
  edit: Edit,
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
