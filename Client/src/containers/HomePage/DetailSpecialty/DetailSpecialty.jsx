import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, path } from "../../../utils";
import { withRouter } from "react-router";
import "./DetailSpecialty.scss";
import * as actions from "../../../store/actions";
import HomeHeader from "../HomeHeader/HomeHeader";
import HomeFooter from "../HomeFooter/HomeFooter";
import Select from "react-select";
import DoctorSchedule from "../DetailDoctor/DoctorSchedule";
import DoctorExtraInfor from "../DetailDoctor/DoctorExtraInfor";
import DoctorInforShowOnSpecialty from "./DoctorInforShowOnSpecialty";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailSpecialty: {},
      arrDoctorGetBySpecialty: [],
      arrProvince: [],
      arrDoctorIdGetByProvince: [],
      selectedProvince: "",
    };
  }

  componentDidMount() {
    this.props.getDetailSpecialtyRedux(this.props.match.params.specialtyId);
    this.props.getDoctorBySpecialtyRedux(this.props.match.params.specialtyId);
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.specialtyDataRedux !== this.props.specialtyDataRedux) {
      this.setState({
        detailSpecialty: this.props.specialtyDataRedux,
      });
    }
    if (
      prevProps.arrDoctorGetBySpecialtyRedux !==
      this.props.arrDoctorGetBySpecialtyRedux
    ) {
      this.setState({
        arrDoctorGetBySpecialty: this.props.arrDoctorGetBySpecialtyRedux,
        arrProvince: this.handleFormatProvinceToSelect(
          this.props.arrDoctorGetBySpecialtyRedux
        ),
      });
    }
  }
  handleFormatProvinceToSelect = (data) => {
    let arr = [];
    if (data && data.length > 0) {
      data.map((item, index) => {
        let obj = {};
        if (index === 0) {
          obj.label =
            this.props.language === LANGUAGES.VI
              ? item.provinceData.valueVi
              : item.provinceData.valueEn;
          obj.value = item.provinceId;
          arr.push(obj);
        }
        if (index > 0 && item.provinceId !== data[index - 1].provinceId) {
          obj.label =
            this.props.language === LANGUAGES.VI
              ? item.provinceData.valueVi
              : item.provinceData.valueEn;
          obj.value = item.provinceId;
          arr.push(obj);
        }
      });
    }
    return arr;
  };
  handleChangeSelectProvince = (selectedOption) => {
    console.log(selectedOption);
    let arr = [];
    if (
      this.state.arrDoctorGetBySpecialty &&
      this.state.arrDoctorGetBySpecialty.length > 0
    ) {
      this.state.arrDoctorGetBySpecialty.map((item, index) => {
        if (item.provinceId === selectedOption.value) {
          arr.push(item.doctorId);
        }
      });
    }
    this.setState({
      selectedProvince: selectedOption,
      arrDoctorIdGetByProvince: arr,
    });
  };

  render() {
    console.log("check state:", this.state);
    let { detailSpecialty } = this.state;
    let headerTitle;
    let description = detailSpecialty ? detailSpecialty.contentHTML : "";
    if (this.props.language === LANGUAGES.VI) {
      headerTitle =
        detailSpecialty && detailSpecialty.specialtyName
          ? detailSpecialty.specialtyName.valueVi
          : "";
    }
    if (this.props.language === LANGUAGES.EN) {
      headerTitle =
        detailSpecialty && detailSpecialty.specialtyName
          ? detailSpecialty.specialtyName.valueEn
          : "";
    }

    return (
      <>
        <HomeHeader isNotDisplayBanner={true} />
        <div className="detail_specialty">
          <div className="detail_specialty-header">
            <div className="specialty_header-title">{headerTitle}</div>
            <div
              className="specialty_header-description"
              dangerouslySetInnerHTML={{ __html: description }}
            ></div>
          </div>
          <div className="detail_specialty-body">
            <div className="select-province">
              <Select
                className="reactSelect"
                value={this.state.selectedProvince}
                onChange={this.handleChangeSelectProvince}
                options={this.state.arrProvince}
              />
            </div>
            <div className="detail_specialty-content">
              {this.state.arrDoctorIdGetByProvince &&
                this.state.arrDoctorIdGetByProvince.length > 0 &&
                this.state.arrDoctorIdGetByProvince.map((item, index) => {
                  return (
                    <div className="detail_specialty-content-item" key={index}>
                      <div className="specialty_content-left">
                        <DoctorInforShowOnSpecialty doctorId={item} />
                      </div>
                      <div className="specialty_content-right">
                        <DoctorSchedule doctorId={item} key={index} />
                        <DoctorExtraInfor doctorId={item} />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <HomeFooter />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    specialtyDataRedux: state.admin.specialtyData,
    arrDoctorGetBySpecialtyRedux: state.admin.arrDoctorGetBySpecialty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) =>
      dispatch(actions.changeLanguageApp(language)),
    getDetailSpecialtyRedux: (specialtyId) =>
      dispatch(actions.getSpecialtyStart(specialtyId)),
    getDoctorBySpecialtyRedux: (specialtyId) =>
      dispatch(actions.getDoctorBySpecialtyStart(specialtyId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
