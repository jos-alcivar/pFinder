import { useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import TapBar from "../layout/TapBar";
import { useUser } from "../hooks/useUser";

import "./Account.css";

function Account() {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="app-ctn">
      <Header title={"pFinder"} />
      <div className="body-ctn">
        <div className="content-ctn">
          <div className="account-ctn">
            <div className="profile-ctn">
              <div className="image-ctn">
                <img
                  className="photo-profile"
                  src={`http://localhost:3000/user/${user.user_uuid}/photo`}
                  width={"96px"}
                  height={"96px"}
                />
              </div>
              <div className="text-profile">{user.user_name}</div>
            </div>
            <div className="menu-ctn">
              <a
                className="label-text-main"
                onClick={() => navigate("/edit-profile")}
              >
                Profile
              </a>
              {/* 
              <div className="label-text-main">Notifications</div>
              <div className="label-text-main">Feedback</div> 
              <div className="label-text-main">Account</div>
              */}
            </div>
            <div className="btn-row">
              <form action="http://localhost:3000/auth/logout" method="GET">
                <button className="logout-btn">Logout</button>
              </form>
            </div>
            <div className="about-ctn">
              <div className="label-text-main">pFinder</div>
              <div className="label-text-p">Version: 1.0.0</div>
              <div className="label-text-p">pFinder is free software</div>
              <div className="label-text-p">
                Licensed under the 3-Clause BSD License
              </div>
            </div>
          </div>
        </div>
      </div>

      <TapBar account={"selected"} />
    </div>
  );
}

export default Account;
