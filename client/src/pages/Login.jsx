import Header from "../layout/Header";
import { ButtonSSO } from "../components/ButtonSSO";
import { InputItem } from "../components/InputItem";

import "./Login.css";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

function Login() {
  return (
    <div className="app-ctn">
      <Header title={"Login"} />
      <div className="body-ctn">
        <div className="content-ctn">
          <div>
            <form
              className="login-ctn"
              action={`${apiBaseUrl}/auth/login`}
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
