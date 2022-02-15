import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, path } from "../../../utils";
import { withRouter } from "react-router";
import HomeHeader from "../HomeHeader/HomeHeader";
import "./DetailDoctor.scss";
import * as actions from "../../../store/actions";
import HomeFooter from "../HomeFooter/HomeFooter";
import DoctorSchedule from "./DoctorSchedule";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
    };
  }

  componentDidMount() {
    this.props.getDetailDoctorRedux(this.props.match.params.id);
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.detailDoctorRedux !== this.props.detailDoctorRedux) {
      this.setState({
        detailDoctor: this.props.detailDoctorRedux,
      });
    }
  }

  render() {
    // console.log(this.props.match.params.id);
    let { detailDoctor } = this.state;
    let position = "";
    let imgBase64 = "";
    let fullName = "";
    let description = "";
    let specialtyOfDoctor = "";
    if (detailDoctor && detailDoctor.positionData) {
      position =
        this.props.language === LANGUAGES.VI
          ? detailDoctor.positionData.valueVi
          : detailDoctor.positionData.valueEn;
    }
    if (detailDoctor && detailDoctor.firstName && detailDoctor.lastName) {
      fullName =
        this.props.language === LANGUAGES.VI
          ? `${detailDoctor.lastName} ${detailDoctor.firstName}`
          : `${detailDoctor.firstName} ${detailDoctor.lastName}`;
    }
    if (detailDoctor && detailDoctor.image) {
      imgBase64 = new Buffer(detailDoctor.image, "base64").toString("binary");
    }
    if (
      detailDoctor &&
      detailDoctor.Markdown &&
      detailDoctor.Markdown.description
    ) {
      description = detailDoctor.Markdown.description;
    }
    if (
      detailDoctor &&
      detailDoctor.Markdown &&
      detailDoctor.Markdown.contentHTML
    ) {
      specialtyOfDoctor = detailDoctor.Markdown.contentHTML;
    }
    return (
      <>
        <HomeHeader isNotDisplayBanner={true} />
        <div className="detail_doctor">
          <div className="detail_doctor-menu">
            <i className="fas fa-home"></i>
            <span>/</span>
            <a href="">Khám chuyên khoa</a>
            <span>/</span>
            <a href="">Da liễu</a>
          </div>
          <div className="doctor_intro-container">
            <img src={imgBase64} alt="" className="doctor_intro-avatar" />
            <div className="doctor_intro-detail">
              <b className="doctor_name">
                {position} {fullName}
              </b>
              <p className="doctor_intro">{description}</p>
            </div>
          </div>
          <div className="schedule_address">
            <div className="schedule_address-left">
              {this.state.detailDoctor && this.state.detailDoctor.id && (
                <DoctorSchedule doctorId={this.state.detailDoctor.id} />
              )}
            </div>
            <div className="schedule_address-right"></div>
          </div>
          <div
            className="doctor_specialty"
            dangerouslySetInnerHTML={{ __html: specialtyOfDoctor }}
          ></div>
        </div>
        <HomeFooter />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    detailDoctorRedux: state.admin.detailDoctor,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) =>
      dispatch(actions.changeLanguageApp(language)),
    getDetailDoctorRedux: (id) => dispatch(actions.getDetailDoctorStart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
