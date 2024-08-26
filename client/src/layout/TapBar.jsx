import { TabItem } from "../components/TabItem";
import { useNavigate } from "react-router-dom";

function TabBar() {
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
        <TabItem label="posts" onClick={() => clickToJobs("posts")} />
        <TabItem label="reports" onClick={() => clickToJobs("reports")} />
        <TabItem label="jobs" onClick={() => clickToJobs("jobs")} />
        <TabItem label="account" onClick={() => clickToJobs("account")} />
      </div>
    </div>
  );
}

export default TabBar;
