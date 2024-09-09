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
        setPwdStatus(value.length >= 1);
        setPwdMinLength(value.length >= 8 ? "completed" : "");
        setPwdNumber(/\d/.test(value) ? "completed" : "");
        setPwdUpperLower(
          /[A-Z]/.test(value) && /[a-z]/.test(value) ? "completed" : ""
        );
        setPwdSymbol(/[^a-zA-Z0-9]/.test(value) ? "completed" : "");
        break;
      default:
        break;
    }
  }

  function handleRegister(event) {
    event.preventDefault(); // Prevent form submission

    // Check if the user exists
    if (userExists) {
      alert("An account with this email address already exists.");
      return;
    }

    // Ensure all password criteria are met
    if (!pwdMinLength || !pwdNumber || !pwdUpperLower || !pwdSymbol) {
      alert("Please ensure your password meets all the requirements.");
      return;
    }

    // If all checks pass, proceed with form submission
    event.target.submit();
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
              onSubmit={handleRegister}
            >
              <InputItem
                label={"Email:"}
                name="email"
                placeholder="Your email"
                type="email"
                onChange={handleChange}
                required
              />
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
                minLength="8"
                required
              />
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
                <button className="register-btn" type="submit">
                  Register
                </button>
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
