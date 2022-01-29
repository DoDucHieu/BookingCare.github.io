import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeFooter.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import { changeLanguageApp } from "../../../store/actions";
import logoBookingCare from "../../../assets/images/bookingcare-2020.svg";
import MinistryOfIndustryAndTrade from "../../../assets/images/bo-cong-thuong.svg";
// import fbbb from "../../../assets/images/facebook-square.svg";
// import ytbbb from "../../../assets/youtube-square.svg";

class HomeFooter extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    return (
      <div className="homeFooter">
        <div className="homeFooter-container">
          <div className="homeFooter-top">
            <div className="homeFooter-left">
              <img src={logoBookingCare} className="homeFooter-left-img1"></img>
              <b className="homeFooter-left-companyName">
                Công ty cổ phần công nghệ Booking Care
              </b>
              <p className="homeFooter-left-address">
                <i className="fas fa-map-marker-alt"></i>
                <span className="homeFooter-left-address">
                  28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội
                </span>
              </p>
              <p className="homeFooter-left-address">
                <i className="fas fa-check"></i>
                <span>
                  ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015
                </span>
              </p>
              <div className="homeFooter-left-img2">
                <img
                  src={MinistryOfIndustryAndTrade}
                  className="homeFooter-left-imgTwo"
                ></img>
                <img
                  src={MinistryOfIndustryAndTrade}
                  className="homeFooter-left-imgTwo"
                ></img>
              </div>
            </div>
            <div className="homeFooter-middle">
              <a href="#">Liên hệ hợp tác</a>
              <a href="#">Câu hỏi thường gặp</a>
              <a href="#">Điều khoản sử dụng</a>
              <a href="#">Chính sách Bảo mật</a>
              <a href="#">Quy trình hỗ trợ giải quyết khiếu nại</a>
              <a href="#">Quy chế hoạt động</a>
            </div>
            <div className="homeFooter-right">
              <div className="homeFooter-right-headquarters">
                <b>Trụ sở tại Hà Nội</b>
                <p>28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</p>
              </div>

              <div className="homeFooter-right-headquarters">
                <b>Văn phòng tại TP Hồ Chí Minh</b>
                <p>6/6 Cách Mạch Tháng Tám, P. Bến Thành, Quận 1</p>
              </div>
              <div className="homeFooter-right-headquarters">
                <b>Hỗ trợ khách hàng</b>
                <p>support@bookingcare.vn (7h30 - 18h)</p>
              </div>
            </div>
          </div>
          <div className="homeFooter-bottom">
            <p>
              <i className="fas fa-mobile-alt"></i>
              <span>
                Tải ứng dụng BookingCare cho điện thoại hoặc máy tính bảng:
              </span>
              <a href="#">Android</a>
              <a href="#">Iphone/Ipad</a>
              <a href="#">Khác</a>
            </p>
          </div>
        </div>
        <div className="homeFooter-end">
          <p>
            <i className="far fa-copyright"></i>
            <span>2021 BookingCare.</span>
          </p>
          <p className="homeFooter-end-fb-ytb">
            <div className="homeFooter-end-fb"></div>
            <div className="homeFooter-end-ytb"></div>
          </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
