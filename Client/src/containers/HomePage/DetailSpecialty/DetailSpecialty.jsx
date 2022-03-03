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
      selectedProvince: {},
    };
  }

  componentDidMount() {
    this.props.getDetailSpecialtyRedux(this.props.match.params.specialtyId);
    this.props.getDoctorBySpecialtyRedux(this.props.match.params.specialtyId);
    this.props.fetchProvinceRedux();
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.language !== this.props.language) {
      this.setState({
        arrProvince: this.handleFormatProvinceToSelect(
          this.props.provinceRedux
        ),
        selectedProvince:
          this.props.language === LANGUAGES.VI
            ? { label: "Toàn quốc", value: "ALL" }
            : { label: "Nationwide", value: "ALL" },
      });
    }
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
      });
    }
    if (prevProps.provinceRedux !== this.props.provinceRedux) {
      this.setState({
        arrProvince: this.handleFormatProvinceToSelect(
          this.props.provinceRedux
        ),
        selectedProvince:
          this.props.language === LANGUAGES.VI
            ? { label: "Toàn quốc", value: "ALL" }
            : { label: "Nationwide", value: "ALL" },
      });
    }
  }
  handleFormatProvinceToSelect = (data) => {
    let arr =
      this.props.language === LANGUAGES.VI
        ? [{ label: "Toàn Quốc", value: "ALL" }]
        : [{ label: "Nationwide", value: "ALL" }];
    if (data && data.length > 0) {
      data.map((item, index) => {
        let obj = {};
        obj.label =
          this.props.language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        obj.value = item.keyMap;
        arr.push(obj);
      });
    }
    return arr;
  };
  handleChangeSelectProvince = (selectedOption) => {
    console.log(selectedOption);
    this.setState({
      selectedProvince: selectedOption,
    });
  };

  render() {
    console.log("check state:", this.state);
    let { detailSpecialty } = this.state;
    let headerTitle;
    let description = detailSpecialty ? detailSpecialty.contentHTML : "";
    let check = 0;
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
              <label>
                <FormattedMessage id={"detail-specialty.select-province"} />
              </label>
              <Select
                className="reactSelect"
                value={this.state.selectedProvince}
                onChange={this.handleChangeSelectProvince}
                options={this.state.arrProvince}
              />
            </div>
            <div className="detail_specialty-content">
              {this.state.arrDoctorGetBySpecialty &&
                this.state.arrDoctorGetBySpecialty.length > 0 &&
                this.state.arrDoctorGetBySpecialty.map((item, index) => {
                  if (this.state.selectedProvince.value === "ALL") {
                    check = 1;
                    return (
                      <div
                        className="detail_specialty-content-item"
                        key={index}
                      >
                        <div className="specialty_content-left">
                          <DoctorInforShowOnSpecialty
                            doctorId={item.doctorId}
                          />
                        </div>
                        <div className="specialty_content-right">
                          <DoctorSchedule doctorId={item.doctorId} />
                          <DoctorExtraInfor doctorId={item.doctorId} />
                        </div>
                      </div>
                    );
                  }
                  if (
                    item.Clinic.provinceId === this.state.selectedProvince.value
                  ) {
                    check = 1;
                    return (
                      <div
                        className="detail_specialty-content-item"
                        key={index}
                      >
                        <div className="specialty_content-left">
                          <DoctorInforShowOnSpecialty
                            doctorId={item.doctorId}
                          />
                        </div>
                        <div className="specialty_content-right">
                          <DoctorSchedule doctorId={item.doctorId} />
                          <DoctorExtraInfor doctorId={item.doctorId} />
                        </div>
                      </div>
                    );
                  }
                })}
              {check === 0 && (
                <div
                  style={{
                    width: "100%",
                    fontSize: "16px",
                    color: "red",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {this.props.language === LANGUAGES.VI
                    ? "Không có bác sĩ nào"
                    : "There are no doctors here!"}
                </div>
              )}
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
    provinceRedux: state.admin.province,
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
    fetchProvinceRedux: () => dispatch(actions.fetchProvinceStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
