import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import "./HandBook.scss";
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
class HandBook extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      autoplay: true,
      slidesToShow: 2,
      slidesToScroll: 2,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };
    return (
      <div className="specialty handBook">
        <div className="popularSpecialty-header">
          <b className="popularSpecialty-header-text">
            <FormattedMessage id={"section.hand-book"} />
          </b>
          <button className="popularSpecialty-header-button handBook-header-button">
            <FormattedMessage id={"section.all-hand-book"} />
          </button>
        </div>
        <div className="popularSpecialty-body">
          <div className="container">
            <Slider {...settings}>
              <div className="handleBook-item-border">
                <div className="handBook-item">
                  <img
                    src="https://cdn.bookingcare.vn/fr/w300/2021/04/08/162555-benh-vien-thu-cuc-kham-gif.jpg"
                    className="handBook-body-img"
                  ></img>
                  <p className="handBook-body-text">
                    <span>
                      Bệnh viện Thu Cúc khám những gì? Bác sĩ giỏi tại Bệnh viện
                      Thu Cúc
                    </span>
                  </p>
                </div>
              </div>
              <div className="handleBook-item-border">
                <div className="handBook-item">
                  <img
                    src="https://cdn.bookingcare.vn/fr/w300/2021/04/08/162555-benh-vien-thu-cuc-kham-gif.jpg"
                    className="handBook-body-img"
                  ></img>
                  <p className="handBook-body-text">
                    <span>
                      Bệnh viện Thu Cúc khám những gì? Bác sĩ giỏi tại Bệnh viện
                      Thu Cúc
                    </span>
                  </p>
                </div>
              </div>
              <div className="handleBook-item-border">
                <div className="handBook-item">
                  <img
                    src="https://cdn.bookingcare.vn/fr/w300/2021/04/08/162555-benh-vien-thu-cuc-kham-gif.jpg"
                    className="handBook-body-img"
                  ></img>
                  <p className="handBook-body-text">
                    <span>
                      Bệnh viện Thu Cúc khám những gì? Bác sĩ giỏi tại Bệnh viện
                      Thu Cúc
                    </span>
                  </p>
                </div>
              </div>
              <div className="handleBook-item-border">
                <div className="handBook-item">
                  <img
                    src="https://cdn.bookingcare.vn/fr/w300/2021/04/08/162555-benh-vien-thu-cuc-kham-gif.jpg"
                    className="handBook-body-img"
                  ></img>
                  <p className="handBook-body-text">
                    <span>
                      Bệnh viện Thu Cúc khám những gì? Bác sĩ giỏi tại Bệnh viện
                      Thu Cúc
                    </span>
                  </p>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
