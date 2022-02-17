import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, path } from "../../../utils";
import { withRouter } from "react-router";
import "./DoctorSchedule.scss";
import * as actions from "../../../store/actions";
import moment from "moment";
import localization from "moment/locale/vi";
import { dateFormat } from "../../../utils";
import BookingScheduleModal from "./BookingScheduleModal";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDate: [],
      dateSelected: moment(new Date()).format(dateFormat.DATE_FORMAT),
      doctorId: this.props.doctorId,
      doctorSchedule: [],
      isOpenBookingScheduleModal: false,
      dataToDoctorScheduleModal: {},
    };
  }

  componentDidMount() {
    this.props.getDoctorScheduleRedux(
      this.state.doctorId,
      this.state.dateSelected
    );
    this.setState({
      arrDate: this.formattedDate(),
    });
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.language !== this.props.language) {
      this.setState({
        arrDate: this.formattedDate(),
      });
    }
    if (prevProps.doctorScheduleRedux !== this.props.doctorScheduleRedux) {
      this.setState({
        doctorSchedule: this.props.doctorScheduleRedux,
      });
    }
  }
  formattedDate = () => {
    let arrDate = [];
    for (let i = 0; i < 7; i++) {
      let obj = {};
      obj.label =
        this.props.language === LANGUAGES.VI
          ? moment(new Date()).add(i, "day").format("ddd - DD/MM")
          : moment(new Date()).add(i, "day").locale("en").format("ddd - MM/DD");
      //   obj.value = moment(new Date()).add(i, "day").startOf("day").valueOf();
      obj.value = moment(new Date())
        .add(i, "day")
        .format(dateFormat.DATE_FORMAT);
      arrDate.push(obj);
    }
    return arrDate;
  };
  handleChangeDateSelect = (event) => {
    this.setState(
      {
        dateSelected: event.target.value,
      },
      async () => {
        await this.props.getDoctorScheduleRedux(
          this.state.doctorId,
          this.state.dateSelected
        );
      }
    );
  };
  handleOnlickBookingSchedule = (item) => {
    this.setState({
      isOpenBookingScheduleModal: !this.state.isOpenBookingScheduleModal,
      dataToDoctorScheduleModal: item ? item : {},
    });
  };
  render() {
    let { arrDate } = this.state;
    return (
      <>
        <div className="doctor_schedule">
          <div className="doctor_schedule-header">
            <select
              className="select_date"
              name=""
              id=""
              onChange={(event) => this.handleChangeDateSelect(event)}
            >
              {arrDate &&
                arrDate.length > 0 &&
                arrDate.map((item, index) => {
                  if (index === 0) {
                    item.label =
                      this.props.language === LANGUAGES.VI
                        ? "Hôm nay- " + moment(new Date()).format("DD/MM")
                        : "Today- " + moment(new Date()).format("MM/DD");
                  }
                  return (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
            <div className="header_logo_text">
              <i className="far fa-calendar-alt"></i>
              <p>
                {this.props.language === LANGUAGES.EN ? (
                  <FormattedMessage id={"doctor-schedule.doctor-schedule"} />
                ) : (
                  <FormattedMessage id={"doctor-schedule.doctor-schedule"} />
                )}
              </p>
            </div>
          </div>
          <div className="doctor_schedule-body">
            <div className="doctor_schedule-table">
              {this.state.doctorSchedule &&
              this.state.doctorSchedule.length > 0 ? (
                this.state.doctorSchedule.map((item, index) => {
                  return (
                    <button
                      key={index}
                      className="btn_doctor-schedule"
                      onClick={() => this.handleOnlickBookingSchedule(item)}
                    >
                      {this.props.language === LANGUAGES.EN
                        ? item.timeData.valueEn
                        : item.timeData.valueVi}
                    </button>
                  );
                })
              ) : this.props.language === LANGUAGES.VI ? (
                <p className="noticfication">
                  <FormattedMessage
                    id={"doctor-schedule.notification-schedule"}
                  />
                </p>
              ) : (
                <p className="noticfication">
                  <FormattedMessage
                    id={"doctor-schedule.notification-schedule"}
                  />
                </p>
              )}
            </div>
          </div>
        </div>
        {this.state.isOpenBookingScheduleModal &&
          this.state.dataToDoctorScheduleModal && (
            <BookingScheduleModal
              isOpen={this.state.isOpenBookingScheduleModal}
              handleShowHideModal={this.handleOnlickBookingSchedule.bind(this)}
              dataFromDoctorSchedule={this.state.dataToDoctorScheduleModal}
            />
          )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    doctorScheduleRedux: state.admin.doctorSchedule,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) =>
      dispatch(actions.changeLanguageApp(language)),
    getDoctorScheduleRedux: (doctorId, dateSelected) =>
      dispatch(actions.getDoctorScheduleStart(doctorId, dateSelected)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
