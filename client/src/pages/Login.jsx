import Header from "../layout/Header";
import { ButtonSSO } from "../components/ButtonSSO";
import { InputItem } from "../components/InputItem";

import "./Login.css";

function Login() {
  return (
    <div className="app-ctn">
      <Header title={"Login"} />
      <div className="body-ctn">
        <div className="content-ctn">
          <div>
            <form
              className="login-ctn"
              action="http://localhost:3000/auth/login"
              method="POST"
            >
              <InputItem
                label={"Email:"}
                name="email"
                placeholder="Your email"
                type="email"
                required
              ></InputItem>
              <InputItem
                label={"Password:"}
                name="password"
                placeholder="At least 8 characters"
                type="password"
                required
              ></InputItem>
              <div className="btn-row">
                <button className="login-btn">Login</button>
                <a className="login-txt">Forgot Password?</a>
              </div>
              <div className="sso-row">
                <ButtonSSO label="Sign in with Google" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
