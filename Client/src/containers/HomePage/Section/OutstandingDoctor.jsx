import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import "./OutstandingDoctor.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
// import { changeLanguageApp } from "../../../store/actions";
import * as actions from "../../../store/actions";
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
class OutstandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topDoctorArr: [],
    };
  }
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  componentDidMount() {
    this.props.getOutstandingDoctorRedux(10);
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.topDoctorRedux !== this.props.topDoctorRedux) {
      this.setState({
        topDoctorArr: this.props.topDoctorRedux,
      });
    }
  }

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
    console.log(this.state.topDoctorArr);
    let arrTopDoctor = this.state.topDoctorArr;
    return (
      <div className="specialty outstandingDoctor">
        <div className="popularSpecialty-header">
          <b className="popularSpecialty-header-text">Tướng nổi bật</b>
          <button className="popularSpecialty-header-button">TÌM KIẾM</button>
        </div>
        <div className="outstandingDoctor-body">
          <div className="container">
            <Slider {...settings}>
              {arrTopDoctor &&
                arrTopDoctor.length > 0 &&
                arrTopDoctor.map((item, index) => {
                  let imgBase64 = "";
                  if (item.image) {
                    imgBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  return (
                    <div className="outstandingDoctor-item-border">
                      <div className=" outstandingDoctor-item">
                        <img
                          src={imgBase64}
                          className="outstandingDoctor-body-img"
                        ></img>

                        <span className="outstandingDoctor-body-text">
                          {this.props.language === LANGUAGES.VI
                            ? item.positionData.valueVi
                            : item.positionData.valueEn}
                        </span>
                        <p className="outstandingDoctor-body-text-bot">
                          {`${item.firstName} ${item.lastName}`}
                        </p>
                      </div>
                    </div>
                  );
                })}
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
    topDoctorRedux: state.admin.outstandingDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) =>
      dispatch(actions.changeLanguageApp(language)),
    getOutstandingDoctorRedux: (limit) =>
      dispatch(actions.getOutstandingDoctorStart(limit)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
