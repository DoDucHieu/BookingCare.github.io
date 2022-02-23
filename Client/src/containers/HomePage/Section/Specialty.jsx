import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { history } from "../../../redux";
import { withRouter } from "react-router";

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
  constructor(props) {
    super(props);
    this.state = {
      arrSpecialty: [],
    };
  }
  componentDidMount = () => {
    this.props.getAllSpecialtyRedux("ALL");
  };
  componentDidUpdate = (prevProps, prevState, snapShot) => {
    if (prevProps.specialtyDataRedux !== this.props.specialtyDataRedux) {
      this.setState({
        arrSpecialty: this.props.specialtyDataRedux,
      });
    }
  };
  handleGetDetailSpecialty = (item) => {
    // console.log("check item: ", item);
    this.props.history.push(`/detail-specialty-${item.specialtyId}`);
  };
  render() {
    console.log("check state specialty:", this.state);
    let { arrSpecialty } = this.state;
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
          <b className="popularSpecialty-header-text">
            <FormattedMessage id={"section.outstanding-specialty"} />
          </b>
          <button className="popularSpecialty-header-button">
            <FormattedMessage id={"section.search"} />
          </button>
        </div>
        <div className="popularSpecialty-body">
          <div className="container">
            <Slider {...settings}>
              {arrSpecialty &&
                arrSpecialty.length > 0 &&
                arrSpecialty.map((item, index) => {
                  let imgBase64 = new Buffer(item.image, "base64").toString(
                    "binary"
                  );
                  return (
                    <div
                      className="popularSpecial-item"
                      key={index}
                      onClick={() => this.handleGetDetailSpecialty(item)}
                    >
                      <img
                        src={imgBase64}
                        className="popularSpecialty-body-img"
                      ></img>
                      <p className="popularSpecialty-body-text">
                        {this.props.language === LANGUAGES.EN
                          ? item.specialtyName.valueEn
                          : item.specialtyName.valueVi}
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
    specialtyDataRedux: state.admin.specialtyData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) =>
      dispatch(actions.changeLanguageApp(language)),
    getAllSpecialtyRedux: (specialtyId) =>
      dispatch(actions.getSpecialtyStart(specialtyId)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
