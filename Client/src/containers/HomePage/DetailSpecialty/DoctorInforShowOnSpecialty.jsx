import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, path } from "../../../utils";
import { withRouter } from "react-router";
import "./DoctorInforShowOnSpecialty.scss";
import * as actions from "../../../store/actions";
import Select from "react-select";
import { getDoctorShowOnSpecialty } from "../../../services/userService";

class DoctorInforShowOnSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
    };
  }

  componentDidMount = async () => {
    try {
      let result = await getDoctorShowOnSpecialty(this.props.doctorId);
      if (result && result.errCode === 0) {
        this.setState({
          detailDoctor: result.data,
        });
      } else {
        console.log("Err from DoctorInforShowOnSpecialty:", result.errCode);
      }
    } catch (e) {
      console.log(e);
    }
  };
  componentDidUpdate(prevProps, prevState, snapShot) {}

  render() {
    console.log("check state:", this.state);
    let { detailDoctor } = this.state;
    let position = "";
    let imgBase64 = "";
    let fullName = "";
    let description = "";
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

    return (
      <div className="doctorInfor_showOnSpecialty">
        <img src={imgBase64} alt="" className="avatar" />
        <div className="doctor-detail">
          <b className="doctor_name">
            {position} {fullName}
          </b>
          <p className="doctor_intro">{description}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DoctorInforShowOnSpecialty);
