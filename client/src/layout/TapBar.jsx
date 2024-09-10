import PropTypes from "prop-types";
import { TabItem } from "../components/TabItem";
import { useNavigate } from "react-router-dom";

function TapBar(props) {
  const navigate = useNavigate();

  function clickToJobs(label) {
    switch (label) {
      case "posts": {
        navigate("/posts");
        break;
      }
      case "reports": {
        navigate("/reports");
        break;
      }
      case "jobs": {
        navigate("/jobs");
        break;
      }
      case "account": {
        navigate("/account");
        break;
      }
    }
  }

  return (
    <div className="tabBar-ctn">
      <div className="buttons-row">
        <TabItem
          label="posts"
          onClick={() => clickToJobs("posts")}
          type={props.posts}
        />
        <TabItem
          label="reports"
          onClick={() => clickToJobs("reports")}
          type={props.reports}
        />
        <TabItem
          label="jobs"
          onClick={() => clickToJobs("jobs")}
          type={props.jobs}
        />
        <TabItem
          label="account"
          onClick={() => clickToJobs("account")}
          type={props.account}
        />
      </div>
    </div>
  );
}

export default TapBar;

TapBar.propTypes = {
  account: PropTypes.string,
  jobs: PropTypes.string,
  posts: PropTypes.string,
  reports: PropTypes.string,
};
