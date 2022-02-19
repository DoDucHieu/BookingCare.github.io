import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, path } from "../../../utils";
import { withRouter } from "react-router";
import "./BookingScheduleModal.scss";
import * as actions from "../../../store/actions";
import { Modal } from "reactstrap";
import DoctorInforWhenBooking from "./DoctorInforWhenBooking";
import Select from "react-select";
import { dateFormat } from "../../../utils";
import moment from "moment";

class BookingScheduleModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: this.props.isOpen,
      timeData: this.props.dataFromDoctorSchedule,
      genderArr: [],
      selectedGender: "",
      fullName: "",
      addressContact: "",
      emailContact: "",
      phoneNumber: "",
      dateOfBirth: "",
      reason: "",
    };
  }

  componentDidMount() {
    this.props.getGenderFromRedux();
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      this.setState({
        genderArr: this.formatGenderToUseReactSelect(this.props.genderRedux),
      });
    }
  }
  formatGenderToUseReactSelect = (data) => {
    let arr = [];
    if (data && data.length > 0) {
      data.map((item) => {
        let obj = {};
        obj.label =
          this.props.language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        obj.value = item.keyMap;
        arr.push(obj);
      });
    }
    return arr;
  };

  handleChangeSelectGender = (selectedOption) => {
    console.log(selectedOption);
    this.setState({
      selectedGender: selectedOption,
    });
  };

  handleOnchangeInput = (event, type) => {
    let stateCopy = { ...this.state };
    stateCopy[type] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleSaveBookingSchedule = async () => {
    let data = {};
    data.email = this.state.emailContact;
    data.doctorId = this.state.timeData.doctorId;
    data.date = this.state.timeData.date;
    data.timeString =
      this.props.language === LANGUAGES.VI
        ? `${this.state.timeData.timeData.valueVi} ${moment(
            new Date(this.state.timeData.date)
          ).format("ddd-DD/MM/YYYY")}`
        : `${this.state.timeData.timeData.valueEn} - ${moment(
            new Date(this.state.timeData.date)
          )
            .locale("en")
            .format("ddd-MM/DD/YYYY")}`;
    data.timeType = this.state.timeData.timeType;
    data.doctorFullName =
      this.props.language === LANGUAGES.VI
        ? `${this.state.timeData.doctorData.lastName} ${this.state.timeData.doctorData.firstName}`
        : `${this.state.timeData.doctorData.firstName} ${this.state.timeData.doctorData.lastName}`;
    data.patientFullName = this.state.fullName;
    data.patientAddressContact = this.state.addressContact;
    data.phoneNumber = this.state.phoneNumber;
    data.dateOfBirth =
      this.props.language === LANGUAGES.VI
        ? moment(new Date(this.state.dateOfBirth)).format("DD/MM/YYYY")
        : moment(new Date(this.state.dateOfBirth)).format("MM/DD/YYYY");
    data.reason = this.state.reason;
    data.language = this.props.language;
    console.log("check data from booking schedule modal to server: ", data);
    await this.props.findOrCreateBookingAppointmentRedux(data);
  };
  render() {
    console.log("check state from bookingScheduleModal: ", this.state);
    return (
      <>
        <Modal
          isOpen={this.state.isOpen}
          className={this.props.className}
          size={"lg"}
        >
          <div className="booking_schedule-modal">
            <div className="modal_header">
              <span className="modal_header-title">
                <FormattedMessage id="doctor-schedule-modal.booking-schedule" />
              </span>
              <i
                className="fas fa-times"
                onClick={() => this.props.handleShowHideModal()}
              ></i>
            </div>
            <div className="model_body">
              {/* {JSON.stringify(this.props.dataFromDoctorSchedule)} */}
              <DoctorInforWhenBooking timeData={this.state.timeData} />
              <div className="row mt-3 col-12 ">
                <div className="form-group col-6">
                  <label>
                    <FormattedMessage id="doctor-schedule-modal.full-name" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id=""
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "fullName")
                    }
                  />
                </div>
                <div className="form-group col-6">
                  <label>
                    <FormattedMessage id="doctor-schedule-modal.phone-number" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id=""
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "phoneNumber")
                    }
                  />
                </div>
              </div>
              <div className="row mt-3 col-12 ">
                <div className="form-group col-6">
                  <label>
                    <FormattedMessage id="doctor-schedule-modal.email-contact" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id=""
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "emailContact")
                    }
                  />
                </div>
                <div className="form-group col-6">
                  <label>
                    <FormattedMessage id="doctor-schedule-modal.address-contact" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id=""
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "addressContact")
                    }
                  />
                </div>
              </div>
              <div className="row mt-3 col-12 ">
                <div className="form-group col-6">
                  <label>
                    <FormattedMessage id="doctor-schedule-modal.gender" />
                  </label>
                  <Select
                    className="reactSelect"
                    value={this.state.selectedGender}
                    onChange={this.handleChangeSelectGender}
                    options={this.state.genderArr}
                    name={"selectedGender"}
                  />
                </div>
                <div className="form-group col-6">
                  <label>
                    <FormattedMessage id="doctor-schedule-modal.date-of-birth" />
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id=""
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "dateOfBirth")
                    }
                  />
                </div>
              </div>
              <div className="row mt-3 col-12 ">
                <div className="form-group col-12">
                  <label>
                    <FormattedMessage id="doctor-schedule-modal.reason-for-examination" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id=""
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "reason")
                    }
                  />
                </div>
              </div>
            </div>
            <div className="modal_footer">
              <div className="footer_btn">
                <button
                  className="btn btn-primary booking_save"
                  onClick={() => this.handleSaveBookingSchedule()}
                >
                  Lưu
                </button>
                <button
                  className="btn btn-dark booking_cancel"
                  onClick={() => this.props.handleShowHideModal()}
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) =>
      dispatch(actions.changeLanguageApp(language)),
    getGenderFromRedux: () => dispatch(actions.fetchGenderStart()),
    findOrCreateBookingAppointmentRedux: (data) =>
      dispatch(actions.findOrCreateBookingAppointmentStart(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingScheduleModal);
