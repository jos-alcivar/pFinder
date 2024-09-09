import { useState } from "react";
import { checkUserExists } from "../utils/profile.helpers";
import Header from "../layout/Header";
import { ButtonSSO } from "../components/ButtonSSO";
import { InputItem } from "../components/InputItem";
import "./Register.css";

function Register() {
  const [userExists, setUserExists] = useState(false);
  const [pwdStatus, setPwdStatus] = useState(false);
  const [pwdMinLength, setPwdMinLength] = useState("");
  const [pwdNumber, setPwdNumber] = useState("");
  const [pwdSymbol, setPwdSymbol] = useState("");
  const [pwdUpperLower, setPwdUpperLower] = useState("");

  async function handleChange(event) {
    const { name, value } = event.target;
    switch (name) {
      case "email":
        checkUserExists(value, setUserExists);
        break;
      case "password":
        if (value.length >= 1) {
          setPwdStatus(true);
        }
        if (value.length >= 8) {
          setPwdMinLength("completed");
        }
        if (/\d/.test(value)) {
          setPwdNumber("completed");
        }
        if (/[A-Z]/.test(value) && /[a-z]/.test(value)) {
          setPwdUpperLower("completed");
        }
        if (/[^a-zA-Z0-9]/.test(value)) {
          setPwdSymbol("completed");
        }
        break;
    }
  }

  return (
    <div className="app-ctn">
      <Header title={"Register"} />
      <div className="body-ctn">
        <div className="content-ctn">
          <div>
            <form
              className="register-ctn"
              action="http://localhost:3000/user/register"
              method="POST"
            >
              <InputItem
                label={"Email:"}
                name="email"
                placeholder="Your email"
                type="email"
                onChange={handleChange}
                required
              ></InputItem>
              {userExists && (
                <div className="email-warning">
                  An account with this email address already exists.
                </div>
              )}
              <InputItem
                label={"Password:"}
                name="password"
                placeholder="Your password"
                type="password"
                onChange={handleChange}
                required
              ></InputItem>{" "}
              {pwdStatus && (
                <div className="passcheck-ctn">
                  <div className={`check${pwdMinLength}`}>
                    At least 8 characters
                  </div>
                  <div className={`check${pwdSymbol}`}>At least one symbol</div>
                  <div className={`check${pwdNumber}`}>At least one number</div>
                  <div className={`check${pwdUpperLower}`}>
                    Lowercase/Uppercase
                  </div>
                </div>
              )}
              <div className="btn-row">
                <button className="register-btn">Register</button>
              </div>
              <div className="sso-row">
                <ButtonSSO label="Sign up with Google" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
