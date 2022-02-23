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
import DoctorExtraInfor from "./DoctorExtraInfor";
import { getDetailDoctor } from "../../../services/userService";
class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
    };
  }

  componentDidMount = async () => {
    try {
      let result = await getDetailDoctor(this.props.match.params.id);
      if (result && result.errCode === 0) {
        this.setState({
          detailDoctor: result.data,
        });
      } else {
        console.log("Err from DetailDoctor:", result.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };
  componentDidUpdate(prevProps, prevState, snapShot) {}
  handleOnclickRedirectToDetailSpecialty = (specialtyId) => {
    this.props.history.push(`/detail-specialty-${specialtyId}`);
  };

  render() {
    // console.log(this.props.match.params.id);
    let { detailDoctor } = this.state;
    let position = "";
    let imgBase64 = "";
    let fullName = "";
    let description = "";
    let detailSpecialtyOfDoctor = "";
    let specialtyName = "";
    let specialtyId = "";
    if (
      detailDoctor &&
      detailDoctor.DoctorInfor &&
      detailDoctor.DoctorInfor.specialtyData
    ) {
      specialtyName =
        this.props.language === LANGUAGES.VI
          ? detailDoctor.DoctorInfor.specialtyData.valueVi
          : detailDoctor.DoctorInfor.specialtyData.valueEn;
      specialtyId = detailDoctor.DoctorInfor.specialtyId;
    }
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
      detailSpecialtyOfDoctor = detailDoctor.Markdown.contentHTML;
    }
    return (
      <>
        <HomeHeader isNotDisplayBanner={true} />
        <div className="detail_doctor">
          <div className="detail_doctor-menu">
            <i className="fas fa-home"></i>
            <span>/</span>
            <p>
              <FormattedMessage id={"detail-doctor.specialty-examination"} />
            </p>
            <span>/</span>
            <p
              onClick={() =>
                this.handleOnclickRedirectToDetailSpecialty(specialtyId)
              }
            >
              {specialtyName}
            </p>
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
          <div className="schedule_doctorExtraInfor">
            <div className="schedule_doctorExtraInfor-left">
              {this.state.detailDoctor && this.state.detailDoctor.id && (
                <DoctorSchedule doctorId={this.state.detailDoctor.id} />
              )}
            </div>
            <div className="schedule_doctorExtraInfor-right">
              {this.state.detailDoctor && this.state.detailDoctor.id && (
                <DoctorExtraInfor doctorId={this.state.detailDoctor.id} />
              )}
            </div>
          </div>
          <div
            className="doctor_specialty"
            dangerouslySetInnerHTML={{ __html: detailSpecialtyOfDoctor }}
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
