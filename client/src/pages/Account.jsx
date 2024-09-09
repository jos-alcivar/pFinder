import { useState, useEffect } from "react";
import Header from "../layout/Header";
import TabBar from "../layout/TapBar";
import { useUser } from "../hooks/useUser";
import { fetchImageProfile } from "../utils/profile.helpers";
import "./Account.css";

function Account() {
  const { user } = useUser();
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const loadProfileImage = async () => {
      const result = await fetchImageProfile(user.user_id);
      if (result) {
        setProfileImage(result.photo_url);
      }
    };

    if (user.user_id) {
      loadProfileImage();
    }
  }, [user.user_id]);

  return (
    <div className="app-ctn">
      <Header title={"pFinder"} />
      <div className="body-ctn">
        <div className="content-ctn">
          <div className="account-ctn">
            <div className="profile-ctn">
              <div className="image-ctn">
                {profileImage && (
                  <img
                    className="photo-profile"
                    src={profileImage}
                    width={"96px"}
                    height={"96px"}
                  />
                )}
              </div>
              <div className="text-profile">{user.user_name}</div>
            </div>
            <div className="menu-ctn">
              <div className="label-text-main">Profile</div>
              {/* <div className="label-text-main">Notifications</div>
              <div className="label-text-main">Feedback</div> */}
              <div className="label-text-main">Account</div>
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

      <TabBar account={"selected"} />
    </div>
  );
}

export default Account;
