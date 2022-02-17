import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, path } from "../../../utils";
import { withRouter } from "react-router";
import "./BookingScheduleModal.scss";
import * as actions from "../../../store/actions";
import { Modal } from "reactstrap";
import DoctorInforWhenBooking from "./DoctorInforWhenBooking";

class BookingScheduleModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: this.props.isOpen,
      timeData: this.props.dataFromDoctorSchedule,
    };
  }

  componentDidMount() {}
  componentDidUpdate(prevProps, prevState, snapShot) {}
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
                  <input type="text" className="form-control" id="" />
                </div>
                <div className="form-group col-6">
                  <label>
                    <FormattedMessage id="doctor-schedule-modal.phone-number" />
                  </label>
                  <input type="text" className="form-control" id="" />
                </div>
              </div>
              <div className="row mt-3 col-12 ">
                <div className="form-group col-6">
                  <label>
                    <FormattedMessage id="doctor-schedule-modal.email-contact" />
                  </label>
                  <input type="text" className="form-control" id="" />
                </div>
                <div className="form-group col-6">
                  <label>
                    <FormattedMessage id="doctor-schedule-modal.address-contact" />
                  </label>
                  <input type="text" className="form-control" id="" />
                </div>
              </div>
              <div className="row mt-3 col-12 ">
                <div className="form-group col-12">
                  <label>
                    <FormattedMessage id="doctor-schedule-modal.reason-for-examination" />
                  </label>
                  <input type="text" className="form-control" id="" />
                </div>
              </div>
              <div className="row mt-3 col-12 ">
                <div className="form-group col-6">
                  <label>
                    <FormattedMessage id="doctor-schedule-modal.gender" />
                  </label>
                  <input type="text" className="form-control" id="" />
                </div>
                <div className="form-group col-6">
                  <label>
                    <FormattedMessage id="doctor-schedule-modal.book-for" />
                  </label>
                  <input type="text" className="form-control" id="" />
                </div>
              </div>
            </div>
            <div className="modal_footer">
              <div className="footer_btn">
                <button className="btn btn-primary booking_save">Lưu</button>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) =>
      dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingScheduleModal);
