import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import "./ManagePatient.scss";
import { CommonUtils, manageActions, LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import Select from "react-select";
import moment from "moment";
import { dateFormat } from "../../../utils";
import { toast } from "react-toastify";
import {
  getAllPatientByDoctor,
  doctorConfirmExamination,
} from "../../../services/userService";
import ConfirmExaminationModal from "./ConfirmExaminationModal";
class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDate: [],
      dateSelected: {},
      arrPatient: [],
      isOpenModal: false,
      doctorId: "",
      patientId: "",
      emailOfPatient: "",
      patientFullName: "",
      date: "",
      timeType: "",
      billImage: "",
    };
  }

  componentDidMount = async () => {
    this.getAllPatientByDoctor();
    this.setState({
      arrDate: this.formattedDate(),
      dateSelected:
        this.props.language === LANGUAGES.VI
          ? { label: "Tất cả", value: "ALL" }
          : { label: "All date", value: "ALL" },
    });
  };
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.language !== this.props.language) {
      this.setState({
        arrDate: this.formattedDate(),
        dateSelected:
          this.props.language === LANGUAGES.VI
            ? { label: "Tất cả", value: "ALL" }
            : { label: "All date", value: "ALL" },
      });
    }
  }
  getAllPatientByDoctor = async () => {
    try {
      let result = await getAllPatientByDoctor(this.props.doctorId);
      if (result && result.errCode === 0) {
        this.setState({
          arrPatient: result.data,
        });
      } else {
        console.log("Err from ManagePatient: ", result.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };
  formattedDate = () => {
    let arrDate = [
      {
        label: this.props.language === LANGUAGES.VI ? "Tất cả" : "All date",
        value: "ALL",
      },
    ];
    for (let i = 0; i < 7; i++) {
      let obj = {};
      if (i === 0) {
        obj.label =
          this.props.language === LANGUAGES.VI
            ? "Hôm nay- " + moment(new Date()).format("DD/MM")
            : "Today- " + moment(new Date()).format("MM/DD");
      } else {
        obj.label =
          this.props.language === LANGUAGES.VI
            ? moment(new Date()).add(i, "day").format("dddd - DD/MM")
            : moment(new Date())
                .add(i, "day")
                .locale("en")
                .format("dddd - MM/DD");
      }
      obj.value = moment(new Date())
        .add(i, "day")
        .format(dateFormat.DATE_FORMAT);
      arrDate.push(obj);
    }
    return arrDate;
  };
  handleChangeDateSelect = async (selectedOption) => {
    console.log(selectedOption);
    this.setState({
      dateSelected: selectedOption,
    });
  };
  handleOpenConfirmExaminationModal = async (item, type) => {
    if (type === "parent") {
      this.setState({
        isOpenModal: !this.state.isOpenModal,
        emailOfPatient: item && item.patientData ? item.patientData.email : "",
        doctorId: item ? item.doctorId : "",
        patientId: item ? item.patientId : "",
        patientFullName:
          item && item.patientData ? item.patientData.firstName : "",
        date: item ? item.date : "",
        timeType: item ? item.timeType : "",
      });
    }
    if (type === "child") {
      let data = {};
      data.doctorId = this.state.doctorId;
      data.patientId = this.state.patientId;
      data.date = this.state.date;
      data.timeType = this.state.timeType;
      data.email = !item ? this.state.emailOfPatient : item.email;
      data.fullName = this.state.patientFullName;
      data.billImg = item.billImg;
      data.language = this.props.language;
      console.log("check data to sever:", data);
      let result = await doctorConfirmExamination(data);
      if (result && result.errCode === 0) {
        toast.success("CONFIRM AND SEND BILL SUCCESS!");
      } else {
        toast.error("CONFIRM AND SEND BILL FAILED!");
      }
      await this.getAllPatientByDoctor();
      this.setState({
        isOpenModal: !this.state.isOpenModal,
        emailOfPatient: !item ? this.state.emailOfPatient : item.email,
        billImage: item.billImg,
      });
    }
  };
  render() {
    // console.log("render");
    console.log("parent:", this.state);
    let check = 0;
    return (
      <>
        <div className="manage_patient">
          <p className="title">
            <FormattedMessage id={"manage-patient.title"} />
          </p>
          <div className="col-2 form-group select_date">
            <label>
              <FormattedMessage id={"manage-patient.select-date"} />
            </label>
            <Select
              className="reactSelect"
              value={this.state.dateSelected}
              onChange={this.handleChangeDateSelect}
              options={this.state.arrDate}
            />
          </div>
          <div className="patients-table mt-5 mb-5">
            <table id="customers">
              <tbody>
                <tr>
                  <th>FULL NAME</th>
                  <th>EMAIL</th>
                  <th>PHONE NUMBER</th>
                  <th>ADDRESS</th>
                  <th>TIME</th>
                  <th>DATE</th>
                  <th>ACTIONS</th>
                </tr>
                {this.state.arrPatient &&
                  this.state.arrPatient.length > 0 &&
                  this.state.arrPatient.map((item, index) => {
                    if (this.state.dateSelected.value === "ALL") {
                      check = 1;
                      return (
                        <tr key={index}>
                          <td>{item.patientData.firstName}</td>
                          <td>{item.patientData.email}</td>
                          <td>{item.patientData.phoneNumber}</td>
                          <td>{item.patientData.address}</td>
                          <td>
                            {this.props.language === LANGUAGES.VI
                              ? item.patientTimeData.valueVi
                              : item.patientTimeData.valueEn}
                          </td>
                          <td>
                            {moment(new Date(item.date)).format(
                              dateFormat.DATE_FORMAT
                            )}
                          </td>
                          <td>
                            <button
                              className=" btn btn-primary px-3"
                              onClick={() =>
                                this.handleOpenConfirmExaminationModal(
                                  item,
                                  "parent"
                                )
                              }
                            >
                              Xác nhận
                            </button>
                          </td>
                        </tr>
                      );
                    }
                    if (
                      moment(new Date(item.date)).format(
                        dateFormat.DATE_FORMAT
                      ) === this.state.dateSelected.value
                    ) {
                      check = 1;
                      return (
                        <tr key={index}>
                          <td>{item.patientData.firstName}</td>
                          <td>{item.patientData.email}</td>
                          <td>{item.patientData.phoneNumber}</td>
                          <td>{item.patientData.address}</td>
                          <td>
                            {this.props.language === LANGUAGES.VI
                              ? item.patientTimeData.valueVi
                              : item.patientTimeData.valueEn}
                          </td>
                          <td>
                            {moment(new Date(item.date)).format(
                              dateFormat.DATE_FORMAT
                            )}
                          </td>
                          <td>
                            <button className="btn-edit">
                              <i className="fas fa-user-edit"></i>
                            </button>
                            <button className="btn-delete">
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    }
                  })}
              </tbody>
            </table>
            {check === 0 && (
              <div
                style={{
                  width: "100%",
                  marginTop: "40px",
                  fontSize: "16px",
                  color: "red",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {this.props.language === LANGUAGES.VI
                  ? "Không có bệnh nhân nào"
                  : "There are no patients here!"}
              </div>
            )}
          </div>
          {this.state.isOpenModal === true && this.state.emailOfPatient && (
            <ConfirmExaminationModal
              isOpenModal={this.state.isOpenModal}
              emailFromManagePatient={this.state.emailOfPatient}
              handleShowHideModal={this.handleOpenConfirmExaminationModal}
            />
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    doctorId: state.user.userInfo.id,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
