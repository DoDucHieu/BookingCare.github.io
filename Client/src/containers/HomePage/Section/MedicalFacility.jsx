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
import { withRouter } from "react-router";
import { getAllClinic } from "../../../services/userService";

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
  constructor(props) {
    super(props);
    this.state = {
      arrClinic: [],
    };
  }
  componentDidMount = async () => {
    try {
      let result = await getAllClinic();
      if (result && result.errCode === 0) {
        this.setState({
          arrClinic: result.data,
        });
      } else {
        console.log("Err: ", result.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleOnclickRedirectToDetail = (clinicId) => {
    this.props.history.push(`/detail-medical-facility-${clinicId}`);
  };

  render() {
    console.log("check state from medical facilily: ", this.state);
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
          <b className="popularSpecialty-header-text">
            <FormattedMessage id={"section.outstanding-medical-facility"} />
          </b>
          <button className="popularSpecialty-header-button">
            <FormattedMessage id={"section.search"} />
          </button>
        </div>
        <div className="popularSpecialty-body">
          <div className="container">
            <Slider {...settings}>
              {this.state.arrClinic &&
                this.state.arrClinic.length > 0 &&
                this.state.arrClinic.map((item, index) => {
                  let imgBase64 = new Buffer(item.image, "base64").toString(
                    "binary"
                  );
                  return (
                    <div
                      className="popularSpecial-item"
                      key={index}
                      onClick={() =>
                        this.handleOnclickRedirectToDetail(item.clinicId)
                      }
                    >
                      <img
                        src={imgBase64}
                        className="popularSpecialty-body-img"
                      ></img>
                      <p className="popularSpecialty-body-text">
                        {this.props.language === LANGUAGES.VI
                          ? item.clinicName.valueVi
                          : item.clinicName.valueEn}
                      </p>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
