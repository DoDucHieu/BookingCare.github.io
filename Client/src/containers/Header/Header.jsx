import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGES } from "../../utils";
import { FormattedMessage } from "react-intl";

class Header extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    const { processLogout, language, userInfo } = this.props;
    // console.log("check login persist: ", userInfo);
    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={adminMenu} />
        </div>
        {/* change language */}
        <div className="changeLanguage">
          <span className="welcome">
            <FormattedMessage id="menu.welcome" />
            {userInfo && userInfo.firstName ? userInfo.firstName : ""}
          </span>
          <span
            className={
              language === LANGUAGES.VI
                ? "changeLanguage-vi changeLanguage-active"
                : "changeLanguage-vi"
            }
            onClick={() => this.changeLanguage(LANGUAGES.VI)}
          >
            VI
          </span>
          <span
            className={
              language === LANGUAGES.EN
                ? "changeLanguage-en changeLanguage-active"
                : "changeLanguage-en"
            }
            onClick={() => this.changeLanguage(LANGUAGES.EN)}
          >
            EN
          </span>
          {/* nút logout */}
          <div
            className="btn btn-logout"
            onClick={processLogout}
            title="Log out"
          >
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) =>
      dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
