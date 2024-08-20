import { TabItem } from "../components/TabItem";

function TabBar() {
  return (
    <div className="tabBar-ctn">
      <div className="buttons-row">
        <TabItem label="posts"></TabItem>
        <TabItem label="reports"></TabItem>
        <TabItem label="jobs"></TabItem>
        <TabItem label="account"></TabItem>
      </div>
    </div>
  );
}

export default TabBar;
