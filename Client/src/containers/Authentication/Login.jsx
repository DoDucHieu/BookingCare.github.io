import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLogin } from "../../services/userService";
import { ROLE } from "../../utils";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
  }
  handleOnChangeUserName = (event) => {
    this.setState({
      userName: event.target.value,
    });
    console.log(this.state.userName);
  };
  handleOnChangePassword = async (event) => {
    await this.setState({
      password: event.target.value,
    });
  };
  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleLogin(this.state.userName, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({ errMessage: data.errMessage });
      }
      if (data && data.errCode === 0) {
        await this.props.userLoginSuccess(data.user);
        if (data.user.roleId === ROLE.DOCTOR) {
          this.props.history.push("/doctor");
        }
        if (data.user.roleId === ROLE.ADMIN) {
          this.props.history.push("/admin");
        }
      }
    } catch (err) {
      if (err.response) {
        if (err.response.data) {
          this.setState({
            errMessage: err.response.data.message,
          });
        }
      }
    }
  };
  handleShowPassword = async () => {
    await this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  handleOnKeydownEnterLogin = (event) => {
    if (event.key === "Enter") {
      this.handleLogin();
    }
  };
  handleRedirectToHomePage = () => {
    this.props.history.push("/home");
  };
  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 login-text">
              <FormattedMessage id={"login.login"} />
            </div>
            <div className="col-12 form-group login-input">
              <label htmlFor="">
                <FormattedMessage id={"login.user-name"} />
              </label>
              <input
                type="text"
                className="form-control"
                value={this.state.userName}
                onChange={(event) => this.handleOnChangeUserName(event)}
              />
            </div>
            <div className="col-12 form-group login-input">
              <label htmlFor="">
                <FormattedMessage id={"login.password"} />
              </label>
              <div className="custom-password">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  className="form-control showPassword"
                  value={this.state.password}
                  onChange={(event) => this.handleOnChangePassword(event)}
                  onKeyDown={(event) => {
                    this.handleOnKeydownEnterLogin(event);
                  }}
                />
                <i
                  className={
                    this.state.isShowPassword
                      ? "fas fa-eye"
                      : "fas fa-eye-slash"
                  }
                  onClick={() => this.handleShowPassword()}
                ></i>
              </div>
            </div>
            <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>
            <div className="col-12 ">
              <button className="login-btn" onClick={() => this.handleLogin()}>
                <FormattedMessage id={"login.login"} />
              </button>
            </div>
            <div className="col-12">
              <span className="forgot-password">
                <FormattedMessage id={"login.forgot-your-password"} />
              </span>
            </div>
            <div className="col-12  text-center login-with">
              <span>
                <FormattedMessage id={"login.login-with"} />
              </span>
            </div>
            <div className="col-12 login-social">
              <i className="fab fa-google google"></i>
              <i className="fab fa-facebook-f facebook"></i>
            </div>
            <div className="login_back_to-home col-12 text-center">
              <span onClick={() => this.handleRedirectToHomePage()}>
                <i className="fas fa-angle-left"></i>
                <FormattedMessage id={"login.back-to-home"} />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
