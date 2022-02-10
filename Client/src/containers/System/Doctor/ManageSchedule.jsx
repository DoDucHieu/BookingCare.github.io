import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import "./ManageSchedule.scss";
import { CommonUtils, manageActions, LANGUAGES } from "../../../utils";

import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import Select from "react-select";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctor: [],
      timeArr: [],
      doctorId: "",
      currentDate: "",
      dateSelect: "",
      arrTimeSelect: [],
    };
  }

  componentDidMount() {
    this.props.getAllDoctorRedux();
    this.props.getTimeRedux();
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    today = yyyy + "-" + mm + "-" + dd;
    if (this.state.currentDate !== today) {
      this.setState({
        currentDate: today,
      });
    }

    if (prevProps.allDoctorRedux !== this.props.allDoctorRedux) {
      this.setState({
        arrDoctor: this.handleFullNameDoctor(this.props.allDoctorRedux),
      });
    }
    if (prevProps.language !== this.props.language) {
      this.setState({
        arrDoctor: this.handleFullNameDoctor(this.props.allDoctorRedux),
      });
    }
    if (prevProps.timeRedux !== this.props.timeRedux) {
      let arrTime = this.props.timeRedux;
      arrTime.forEach((item, index) => {
        item.isSelected = false;
      });
      this.setState({
        timeArr: arrTime,
      });
    }
  }
  handleFullNameDoctor = (data) => {
    let listFullNameDoctor = [];
    if (data.length !== 0) {
      data.map((item, index) => {
        let obj = {};
        let fullNameVi = `${item.lastName} ${item.firstName}`;
        let fullNameEn = `${item.firstName} ${item.lastName}`;
        obj.label =
          this.props.language === LANGUAGES.VI ? fullNameVi : fullNameEn;
        obj.value = item.id;
        listFullNameDoctor.push(obj);
      });
    }
    return listFullNameDoctor;
  };

  handleChangeSelectDoctor = async (selectedOption) => {
    console.log(selectedOption);
    this.setState({ selectedOption, doctorId: selectedOption.value });
  };
  handleOnchangeInputDate = (event) => {
    this.setState(
      {
        dateSelect: event.target.value,
      },
      () => {
        console.log("check date: ", this.state.dateSelect);
      }
    );
  };
  handleOnclickSelectTime = (item) => {
    // console.log("before:", this.state.timeArr);
    item.isSelected = !item.isSelected;
    // console.log("after:", this.state.timeArr);
    let arr = this.state.timeArr.filter((item, index) => {
      return item.isSelected;
    });
    let arrTime = [];
    if (arr.length > 0) {
      arrTime = arr.map((item, index) => {
        return this.props.language === "vi" ? item.valueVi : item.valueEn;
      });
    }
    this.setState({
      arrTimeSelect: arrTime,
    });
  };

  handleOnclickSaveSchedule = () => {
    console.log("check state manage schedule: ", this.state);
  };
  render() {
    const { isLoggedIn } = this.props;
    let { timeArr } = this.state;
    return (
      <>
        <div className="manage_schedule">
          <p className="title">
            <FormattedMessage id={"manage-schedule.title"} />
          </p>
          <div className="schedule_container">
            <div className="row">
              <div className="col-4 form-group">
                <span>
                  <FormattedMessage id={"manage-schedule.doctor"} />
                </span>
                <Select
                  className="reactSelect"
                  value={this.state.selectedOption}
                  onChange={this.handleChangeSelectDoctor}
                  options={this.state.arrDoctor}
                />
              </div>
              <div className="col-4 form-group">
                <span>
                  <FormattedMessage id={"manage-schedule.day"} />
                </span>
                <input
                  type="date"
                  min={this.state.currentDate}
                  className="form-control date"
                  onChange={(event) => this.handleOnchangeInputDate(event)}
                  value={this.state.dateSelect}
                />
              </div>
            </div>
            <div className="col-12 mt-4">
              {timeArr.map((item, index) => {
                return (
                  <button
                    className={
                      item.isSelected === true ? "time time-select" : "time"
                    }
                    key={index}
                    onClick={() => this.handleOnclickSelectTime(item)}
                  >
                    {this.props.language === "vi" ? item.valueVi : item.valueEn}
                  </button>
                );
              })}
            </div>
            <button
              className="btn btn-primary px-3 mt-4"
              onClick={() => this.handleOnclickSaveSchedule()}
            >
              Save
            </button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,

    allDoctorRedux: state.admin.allDoctor,
    timeRedux: state.admin.time,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctorRedux: () => dispatch(actions.getAllDoctorStart()),
    getTimeRedux: () => dispatch(actions.fetchTimeStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
