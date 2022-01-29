import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import "./MedicalFacility.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import { changeLanguageApp } from "../../../store/actions";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}
class MedicalFacility extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      autoplay: true,
      slidesToShow: 4,
      slidesToScroll: 4,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };
    return (
      <div className="specialty medicalFacility">
        <div className="popularSpecialty-header">
          <b className="popularSpecialty-header-text">Cơ sở y tế nổi bật</b>
          <button className="popularSpecialty-header-button">TÌM KIẾM</button>
        </div>
        <div className="popularSpecialty-body">
          <div className="container">
            <Slider {...settings}>
              <div className="popularSpecial-item">
                <img
                  src="https://cdn.bookingcare.vn/fr/w500/2020/06/04/091726-benh-vien-bao-son1.jpg"
                  className="popularSpecialty-body-img"
                ></img>
                <p className="popularSpecialty-body-text">
                  Bệnh viện đa khoa Bảo Sơn
                </p>
              </div>
              <div className="popularSpecial-item">
                <img
                  src="https://cdn.bookingcare.vn/fr/w500/2020/06/04/090854-bv-an-viet1.jpg"
                  className="popularSpecialty-body-img"
                ></img>
                <p className="popularSpecialty-body-text">
                  Bệnh viện đa khoa An Việt
                </p>
              </div>
              <div className="popularSpecial-item">
                <img
                  src="https://cdn.bookingcare.vn/fr/w500/2018/06/25/180121phong-kham-hoang-long1.jpg"
                  className="popularSpecialty-body-img"
                ></img>
                <p className="popularSpecialty-body-text">
                  Phòng khám đa khoa Hoàng Long
                </p>
              </div>
              <div className="popularSpecial-item">
                <img
                  src="https://cdn.bookingcare.vn/fr/w500/2020/06/04/101123-bv-mat-dnd1.jpg"
                  className="popularSpecialty-body-img"
                ></img>
                <p className="popularSpecialty-body-text">
                  Bệnh viện mắt quốc tế DND
                </p>
              </div>
              <div className="popularSpecial-item">
                <img
                  src="https://cdn.bookingcare.vn/fr/w500/2021/04/11/172740-sihg.jpg"
                  className="popularSpecialty-body-img"
                ></img>
                <p className="popularSpecialty-body-text">
                  Phòng khám đa khoa Singapore
                </p>
              </div>
              <div className="popularSpecial-item">
                <img
                  src="https://cdn.bookingcare.vn/fr/w500/2021/04/16/110944-sunnycare.png"
                  className="popularSpecialty-body-img"
                ></img>
                <p className="popularSpecialty-body-text">
                  Tư vấn tâm lý SunnyCare
                </p>
              </div>
              <div className="popularSpecial-item">
                <img
                  src="https://cdn.bookingcare.vn/fr/w500/2018/06/18/163407phong-kham-meditec.jpg"
                  className="popularSpecialty-body-img"
                ></img>
                <p className="popularSpecialty-body-text">
                  Phòng khám đa khoa Meditec
                </p>
              </div>
              <div className="popularSpecial-item">
                <img
                  src="https://cdn.bookingcare.vn/fr/w500/2018/12/12/100821cover-phong-kham-da-khoa-quoc-te-exson.jpg"
                  className="popularSpecialty-body-img"
                ></img>
                <p className="popularSpecialty-body-text">
                  Phòng khám quốc tế EXSON
                </p>
              </div>
            </Slider>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
