import Header from "../layout/Header";
import { ButtonSSO } from "../components/ButtonSSO";
import { InputItem } from "../components/InputItem";
import "./Register.css";

function Register() {
  return (
    <div className="app-ctn">
      <Header title={"Register"} />
      <div className="body-ctn">
        <div className="content-ctn">
          <div>
            <form className="register-ctn">
              <InputItem
                label={"Email:"}
                placeholder="Your email"
                type="email"
                required
              ></InputItem>
              <InputItem
                label={"Password:"}
                placeholder="At least 8 characters"
                type="password"
                required
              ></InputItem>
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
