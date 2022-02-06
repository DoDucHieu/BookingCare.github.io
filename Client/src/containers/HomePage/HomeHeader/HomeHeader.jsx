import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import { changeLanguageApp } from "../../../store/actions";
import { withRouter } from "react-router";

class HomeHeader extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  handleOnclickLogo = () => {
    this.props.history.push("/home");
  };
  render() {
    console.log("homeHeader:", this.props.isDisplayBanner);
    return (
      <div className="homeHeader">
        <div className="homeHeader_top">
          <div className="homeHeader-left">
            <i className="fas fa-bars"></i>
            <div
              className="logo-img"
              onClick={() => this.handleOnclickLogo()}
            ></div>
          </div>
          <div className="homeHeader-middle">
            <div className="homeHeader-middle-menu">
              <div className="homeHeader-middle-item">
                <div className="middle-item-text-bold">
                  <b>
                    <FormattedMessage id="homeHeader.specialty" />
                  </b>
                </div>
                <div className="middle-item-text">
                  <FormattedMessage id="homeHeader.search-doctor" />
                </div>
              </div>
              <div className="homeHeader-middle-item">
                <div className="middle-item-text-bold">
                  <b>
                    <FormattedMessage id="homeHeader.health-facility" />
                  </b>
                </div>
                <div className="middle-item-text">
                  <FormattedMessage id="homeHeader.select-room" />
                </div>
              </div>
              <div className="homeHeader-middle-item">
                <div className="middle-item-text-bold">
                  <b>
                    <FormattedMessage id="homeHeader.doctor" />
                  </b>
                </div>
                <div className="middle-item-text">
                  <FormattedMessage id="homeHeader.select-doctor" />
                </div>
              </div>
              <div className="homeHeader-middle-item">
                <div className="middle-item-text-bold">
                  <b>
                    <FormattedMessage id="homeHeader.checkup-package" />
                  </b>
                </div>
                <div className="middle-item-text">
                  <FormattedMessage id="homeHeader.general-health-check" />
                </div>
              </div>
            </div>
          </div>
          <div className="homeHeader-right">
            <i className="fas fa-question-circle"></i>
            <p className="homeHeader_support">
              <FormattedMessage id="homeHeader.support" />
            </p>
            <div className="homeHeader_language">
              <span
                className={this.props.language === LANGUAGES.VI ? "active" : ""}
                onClick={() => this.changeLanguage(LANGUAGES.VI)}
              >
                VI
              </span>

              <span
                className={this.props.language === LANGUAGES.EN ? "active" : ""}
                onClick={() => this.changeLanguage(LANGUAGES.EN)}
              >
                EN
              </span>
            </div>
          </div>
        </div>
        {!this.props.isNotDisplayBanner && (
          <div className="homeHeader_banner">
            <div className="homeHeader_banner-top">
              <div className="text-top">
                <FormattedMessage id="homeHeader.medical-background" />
              </div>
              <div className="text-bottom">
                <FormattedMessage id="homeHeader.comprehensive-health-care" />
              </div>
              <div className="banner_search">
                <input type="text" placeholder="Tìm gói khám" />
                <i className="fas fa-search"></i>
              </div>
              <div className="googlePlay_appStore">
                <div className="googlePlay"></div>
                <div className="appStore"></div>
              </div>
            </div>
            <div className="homeHeader_banner-bottom">
              <div className="banner-bottom-item">
                <div className="img img1"></div>
                <p>
                  <FormattedMessage id="homeHeader.examination-specialty-top" />
                </p>
                <p>
                  <FormattedMessage id="homeHeader.examination-specialty-bot" />
                </p>
              </div>
              <div className="banner-bottom-item">
                <div className="img img2"></div>
                <p>
                  <FormattedMessage id="homeHeader.remote-examination-top" />
                </p>
                <p>
                  <FormattedMessage id="homeHeader.remote-examination-bot" />
                </p>
              </div>
              <div className="banner-bottom-item">
                <div className="img img3"></div>
                <p>
                  <FormattedMessage id="homeHeader.general-examination-top" />
                </p>
                <p>
                  <FormattedMessage id="homeHeader.general-examination-bot" />
                </p>
              </div>
              <div className="banner-bottom-item">
                <div className="img img4"></div>
                <p>
                  <FormattedMessage id="homeHeader.medical-test-top" />
                </p>
                <p>
                  <FormattedMessage id="homeHeader.medical-test-bot" />
                </p>
              </div>
              <div className="banner-bottom-item">
                <div className="img img5"></div>
                <p>
                  <FormattedMessage id="homeHeader.mental-health-top" />
                </p>
                <p>
                  <FormattedMessage id="homeHeader.mental-health-bot" />
                </p>
              </div>
              <div className="banner-bottom-item">
                <div className="img img6"></div>
                <p>
                  <FormattedMessage id="homeHeader.dental-examination-top" />
                </p>
                <p>
                  <FormattedMessage id="homeHeader.dental-examination-bot" />
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
