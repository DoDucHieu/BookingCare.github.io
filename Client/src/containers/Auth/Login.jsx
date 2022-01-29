import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLogin } from "../../services/userService";

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
        console.log(this.state.password);
    };
    handleLogin = async () => {
        this.setState({
            errMessage: "",
        });
        try {
            let data = await handleLogin(
                this.state.userName,
                this.state.password
            );
            if (data && data.errCode !== 0) {
                this.setState({ errMessage: data.errMessage });
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user);
            }
        } catch (err) {
            // console.log(err.response.data.message);
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
        console.log(this.state.isShowPassword);
    };
    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 login-text">Login</div>
                        <div className="col-12 form-group login-input">
                            <label htmlFor="">User Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.userName}
                                onChange={(event) =>
                                    this.handleOnChangeUserName(event)
                                }
                            />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label htmlFor="">Password</label>
                            <div className="custom-password">
                                <input
                                    type={
                                        this.state.isShowPassword
                                            ? "text"
                                            : "password"
                                    }
                                    className="form-control showPassword"
                                    value={this.state.password}
                                    onChange={(event) =>
                                        this.handleOnChangePassword(event)
                                    }
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
                            <button
                                className="login-btn"
                                onClick={() => this.handleLogin()}
                            >
                                Login
                            </button>
                        </div>
                        <div className="col-12">
                            <span className="forgot-password">
                                Forgot your password?
                            </span>
                        </div>
                        <div className="col-12  text-center login-with">
                            <span>Or login with:</span>
                        </div>
                        <div className="col-12 login-social">
                            <i className="fab fa-google google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
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
        // adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        // adminLoginFail: () => dispatch(actions.adminLoginFail()),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) =>
            dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
