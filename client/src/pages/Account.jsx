import Header from "../layout/Header";
import TabBar from "../layout/TapBar";
import "./style.css";
import "./Account.css";

function Account() {
  return (
    <div className="app-ctn">
      <Header title={"Account"} />
      <div className="body-ctn">
        <div className="content-ctn"></div>
      </div>

      <TabBar account={"selected"} />
    </div>
  );
}

export default Account;
