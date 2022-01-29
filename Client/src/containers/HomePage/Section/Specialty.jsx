import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
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
class Specialty extends Component {
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
      <div className="specialty">
        <div className="popularSpecialty-header">
          <b className="popularSpecialty-header-text">Chuyên khoa phổ biến</b>
          <button className="popularSpecialty-header-button">XEM THÊM</button>
        </div>
        <div className="popularSpecialty-body">
          <div className="container">
            <Slider {...settings}>
              <div className="popularSpecial-item">
                <img
                  src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg"
                  className="popularSpecialty-body-img"
                ></img>
                <p className="popularSpecialty-body-text">Cơ xương khớp</p>
              </div>
              <div className="popularSpecial-item">
                <img
                  src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/121146-tai-mui-hong.jpg"
                  className="popularSpecialty-body-img"
                ></img>
                <p className="popularSpecialty-body-text">Tai mũi họng</p>
              </div>
              <div className="popularSpecial-item">
                <img
                  src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/121215-cot-song.jpg"
                  className="popularSpecialty-body-img"
                ></img>
                <p className="popularSpecialty-body-text">Cột sống</p>
              </div>
              <div className="popularSpecial-item">
                <img
                  src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/121042-than-kinh.jpg"
                  className="popularSpecialty-body-img"
                ></img>
                <p className="popularSpecialty-body-text">Thần kinh</p>
              </div>
              <div className="popularSpecial-item">
                <img
                  src="https://cdn.bookingcare.vn/fr/w300/2019/12/16/181619-sieu-am-thai.jpg"
                  className="popularSpecialty-body-img"
                ></img>
                <p className="popularSpecialty-body-text">Siêu âm thai</p>
              </div>
              <div className="popularSpecial-item">
                <img
                  src="https://cdn.bookingcare.vn/fr/w300/2019/12/16/181822-san-phu-khoa.jpg"
                  className="popularSpecialty-body-img"
                ></img>
                <p className="popularSpecialty-body-text">Sản phụ khoa</p>
              </div>
              <div className="popularSpecial-item">
                <img
                  src="https://cdn.bookingcare.vn/fr/w300/2019/12/16/175620-nhi-khoa.jpg"
                  className="popularSpecialty-body-img"
                ></img>
                <p className="popularSpecialty-body-text">Nhi khoa</p>
              </div>
              <div className="popularSpecial-item">
                <img
                  src="https://cdn.bookingcare.vn/fr/w300/2019/12/16/182050-nha-khoa.jpg"
                  className="popularSpecialty-body-img"
                ></img>
                <p className="popularSpecialty-body-text">Nha khoa</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
