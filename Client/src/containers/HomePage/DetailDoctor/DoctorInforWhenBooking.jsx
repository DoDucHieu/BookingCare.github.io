import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, path, dateFormat } from "../../../utils";
import { withRouter } from "react-router";
import "./DoctorInforWhenBooking.scss";
import moment from "moment";
import NumberFormat from "react-number-format";
import * as actions from "../../../store/actions";

class DoctorInforWhenBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorId: this.props.timeData.doctorId,
      timeDetail: this.props.timeData,
      doctorInf: {},
    };
  }

  componentDidMount() {
    this.props.fetchDoctorInforWhenBookingRedux(this.state.doctorId);
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (
      prevProps.doctorInforWhenBookingRedux !==
      this.props.doctorInforWhenBookingRedux
    ) {
      this.setState({
        doctorInf: this.props.doctorInforWhenBookingRedux,
      });
    }
  }
  render() {
    console.log("doctorInforWhenBooking: ", this.state);
    let { doctorInf, timeDetail } = this.state;
    let imgBase64 = "";
    let fullNameDoctor = "";
    let position = "";
    let price = "";
    let date = "";
    let time = "";
    let suffix = "";
    if (doctorInf && doctorInf.image) {
      imgBase64 = new Buffer(doctorInf.image, "base64").toString("binary");
    }
    if (doctorInf && doctorInf.firstName && doctorInf.lastName) {
      fullNameDoctor =
        this.props.language === LANGUAGES.VI
          ? `${doctorInf.lastName} ${doctorInf.firstName}`
          : `${doctorInf.firstName} ${doctorInf.lastName}`;
    }
    if (doctorInf && doctorInf.positionData) {
      position =
        this.props.language === LANGUAGES.VI
          ? doctorInf.positionData.valueVi
          : doctorInf.positionData.valueEn;
    }
    if (doctorInf && doctorInf.DoctorInfor && doctorInf.DoctorInfor.priceData) {
      price =
        this.props.language === LANGUAGES.VI
          ? doctorInf.DoctorInfor.priceData.valueVi
          : doctorInf.DoctorInfor.priceData.valueEn;
    }

    if (timeDetail) {
      date =
        this.props.language === LANGUAGES.VI
          ? moment(timeDetail.date).format("ddd - DD/MM/YYYY")
          : moment(timeDetail.date).locale("en").format("ddd - MM/DD/YYYY");
    }
    if (timeDetail && timeDetail.timeData) {
      time =
        this.props.language === LANGUAGES.VI
          ? timeDetail.timeData.valueVi
          : timeDetail.timeData.valueEn;

      suffix = this.props.language === LANGUAGES.VI ? "VNĐ" : "$";
    }
    return (
      <>
        <div className="doctorInfor_when_booking">
          <img src={imgBase64} alt="" className="doctor-avt" />
          <div className="infor">
            <p className="doctor-name">
              {position} {fullNameDoctor}
            </p>
            <p className="time">
              <span className="time_title">
                <FormattedMessage id={"doctor-infor-when-booking.time"} />
              </span>
              {`${time} - ${date}`}
            </p>
            <p className="price">
              <span className="price_title">
                <FormattedMessage id={"doctor-infor-when-booking.price"} />
              </span>
              <NumberFormat
                value={price}
                displayType={"text"}
                thousandSeparator={true}
                suffix={suffix}
              />
            </p>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    doctorInforWhenBookingRedux: state.admin.doctorInforWhenBooking,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) =>
      dispatch(actions.changeLanguageApp(language)),
    fetchDoctorInforWhenBookingRedux: (doctorId) =>
      dispatch(actions.fetchDoctorInforWhenBookingStart(doctorId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DoctorInforWhenBooking);
