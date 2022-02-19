import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, path } from "../../../utils";
import { withRouter } from "react-router";
import * as actions from "../../../store/actions";
import "./VerifyBookingSchedule.scss";
import HomeHeader from "../HomeHeader/HomeHeader";

class VerifyBookingSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVerify: "",
    };
  }

  componentDidMount() {
    let data = {};
    if (this.props.location && this.props.location.search) {
      data.doctorId = new URLSearchParams(this.props.location.search).get(
        "doctorId"
      );
      data.token = new URLSearchParams(this.props.location.search).get("token");
    }

    this.props.verifyBookingAppointmentRedux(data);
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (
      prevProps.isVerifyBookingAppointmentRedux !==
      this.props.isVerifyBookingAppointmentRedux
    ) {
      console.log("did update:", prevProps.isVerifyBookingAppointmentRedux);
      this.setState({
        isVerify: this.props.isVerifyBookingAppointmentRedux,
      });
    }
  }
  handleRedirect = () => {
    this.props.history.push("/home");
  };

  render() {
    console.log("check:", this.state.isVerify);
    return (
      <>
        <HomeHeader isNotDisplayBanner={true} />
        {this.state.isVerify === true && (
          <div className="verify_booking-schedule">
            <div className="notification">
              <div className="notification_header">Thông báo</div>
              <p>Bạn đã đặt lịch thành công!</p>
              <button
                className="confirm"
                onClick={() => {
                  this.handleRedirect();
                }}
              >
                Trở về trang chủ
              </button>
            </div>
          </div>
        )}
        {this.state.isVerify === false && (
          <div className="verify_booking-schedule">
            <div className="notification">
              <div className="notification_header">Thông báo</div>
              <p>
                Bạn đã đặt lịch thành công từ lâu rồi, vui lòng không nhấn lại
                đường link trong gmail!
              </p>
              <button
                className="confirm"
                onClick={() => {
                  this.handleRedirect();
                }}
              >
                Trở về trang chủ
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isVerifyBookingAppointmentRedux: state.admin.isVerifyBookingAppointment,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) =>
      dispatch(actions.changeLanguageApp(language)),
    verifyBookingAppointmentRedux: (data) =>
      dispatch(actions.verifyBookingAppointmentStart(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerifyBookingSchedule);
