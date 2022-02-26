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
import { getHandbook } from "../../../services/userService";
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
class HandBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrHandbook: [],
    };
  }
  componentDidMount = () => {
    this.handleGetHandbook("ALL");
  };
  handleGetHandbook = async (handbookId) => {
    try {
      let result = await getHandbook(handbookId);
      if (result && result.errCode === 0) {
        this.setState({
          arrHandbook: result.data,
        });
        console.log("Get all handbook success!");
      } else {
        console.log("Get all handbook failed!");
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleRedirectToDetailHandbook = (id) => {
    this.props.history.push(`/detail-handbook-${id}`);
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
              {this.state.arrHandbook &&
                this.state.arrHandbook.length > 0 &&
                this.state.arrHandbook.map((item, index) => {
                  let imgBase64 = new Buffer(
                    item.handbookImg,
                    "base64"
                  ).toString("binary");
                  return (
                    <div
                      className="handleBook-item-border"
                      onClick={() =>
                        this.handleRedirectToDetailHandbook(item.id)
                      }
                    >
                      <div className="handBook-item">
                        <img
                          src={imgBase64}
                          className="handBook-body-img"
                        ></img>
                        <p className="handBook-body-text">
                          <span>{item.handbookName}</span>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HandBook)
);
