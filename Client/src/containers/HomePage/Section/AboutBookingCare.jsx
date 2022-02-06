import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import { changeLanguageApp } from "../../../store/actions";
import "./AboutBookingCare.scss";
import healthOfLife from "../../../assets/images/suckhoedoisong.png";
import VTV1 from "../../../assets/images/vtv1.png";
import ICTNEWS from "../../../assets/images/ictnews.png";
import VNEXPRESS from "../../../assets/images/vnexpress.png";
import VTCNEWS from "../../../assets/images/vtcnews.png";
import MINISTRYOFHEALTH from "../../../assets/images/cuc-cong-nghe-thong-tin-bo-y-te-2.png";
import INFONET from "../../../assets/images/infonet.png";
import VTCGO from "../../../assets/images/vtcgo.png";

class AboutBookingCare extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    return (
      <div className="aboutBookingCare">
        <div className="aboutBookingCare-top">
          <div className="aboutBookingCare-top-left">
            <b className="aboutBookingCare-top-left-header">
              Truyền thông nói về BookingCare
            </b>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/yBbbJd1sKC0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="aboutBookingCare-top-right">
            <img src={healthOfLife} className="healthOfLife"></img>
            <img src={VTV1} className="vtv1"></img>
            <img src={ICTNEWS} className="ictnews"></img>
            <img src={VNEXPRESS} className="vnexpress"></img>
            <img src={VTCNEWS} className="vtcnews"></img>
            <img src={MINISTRYOFHEALTH} className="ministryOfHealth"></img>
            <img src={INFONET} className="infonet"></img>
            <img src={VTV1} className="vtv1"></img>
            <img src={VTCGO} className="vtcgo"></img>
            <img src={VTV1} className="vtv1"></img>
          </div>
        </div>
        <div className="aboutBookingCare-bottom">
          <b className="aboutBookingCare-bottom-dowloadAppText">
            Tải ứng dụng BookingCare
          </b>
          <p>
            <i className="fas fa-check"></i>
            <span>Đặt khám nhanh hơn</span>
          </p>
          <p>
            <i className="fas fa-check"></i>
            <span>Nhận thông báo từ hệ thống</span>
          </p>
          <p>
            <i className="fas fa-check"></i>
            <span>Nhận hướng dẫn đi khám chi tiết</span>
          </p>
          <div className="aboutBookingCare-bottom-googlePlay_appStore">
            <div className="aboutBookingCare-bottom-googlePlay"></div>
            <div className="aboutBookingCare-bottom-appStore"></div>
          </div>
          <a href="#">
            <i>Hoặc mở liên kết này!</i>
          </a>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AboutBookingCare);
