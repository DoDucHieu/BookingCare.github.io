import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, path } from "../../../utils";
import { withRouter } from "react-router";
import "./DetailMedicalFacility.scss";
import * as actions from "../../../store/actions";
import HomeHeader from "../HomeHeader/HomeHeader";
import HomeFooter from "../HomeFooter/HomeFooter";
import Select from "react-select";
import DoctorSchedule from "../DetailDoctor/DoctorSchedule";
import DoctorExtraInfor from "../DetailDoctor/DoctorExtraInfor";
import DoctorInforShowOnSpecialty from "../DetailSpecialty/DoctorInforShowOnSpecialty";
import {
  getDetailClinic,
  getDoctorByClinic,
} from "../../../services/userService";

class DetailMedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailClinic: {},
      arrSpecialty: [],
      selectedSpecialty: {},
      arrDoctor: [],
    };
  }

  componentDidMount = async () => {
    this.getDetailClinic(this.props.match.params.clinicId);
    this.getDoctorByClinic(this.props.match.params.clinicId);
    this.props.fetchSpecialtyRedux();
  };

  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.language !== this.props.language) {
      this.setState({
        arrSpecialty: this.handleFormatSpecialtyToSelect(
          this.props.specialtyRedux
        ),
        selectedSpecialty:
          this.props.language === LANGUAGES.VI
            ? { label: "Tất cả", value: "ALL" }
            : { label: "All specialty", value: "ALL" },
      });
    }
    if (prevProps.specialtyRedux !== this.props.specialtyRedux) {
      this.setState({
        arrSpecialty: this.handleFormatSpecialtyToSelect(
          this.props.specialtyRedux
        ),
        selectedSpecialty:
          this.props.language === LANGUAGES.VI
            ? { label: "Tất cả", value: "ALL" }
            : { label: "All specialty", value: "ALL" },
      });
    }
  }

  getDetailClinic = async (clinicId) => {
    try {
      let result = await getDetailClinic(clinicId);
      if (result && result.errCode === 0) {
        this.setState({
          detailClinic: result.data,
        });
      } else {
        console.log("Err from DetailMedicalFacility: ", result.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  getDoctorByClinic = async (clinicId) => {
    try {
      let result = await getDoctorByClinic(clinicId);
      if (result && result.errCode === 0) {
        this.setState({
          arrDoctor: result.data,
        });
      } else {
        console.log("Err from DetailMedicalFacility: ", result.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleFormatSpecialtyToSelect = (data) => {
    let arr =
      this.props.language === LANGUAGES.VI
        ? [{ label: "Tất cả", value: "ALL" }]
        : [{ label: "All specialty", value: "ALL" }];
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

  handleChangeSelectSpecialty = (selectedOption) => {
    console.log(selectedOption);
    this.setState({
      selectedSpecialty: selectedOption,
    });
  };

  render() {
    console.log("check state from DetailMedicalFacility: ", this.state);
    let check = 0;
    let { detailClinic } = this.state;
    let background, facilityName, contentHTML;
    let facilityAddress = detailClinic ? detailClinic.clinicAddress : "";
    if (detailClinic && detailClinic.clinicName) {
      facilityName =
        this.props.language === LANGUAGES.VI
          ? detailClinic.clinicName.valueVi
          : detailClinic.clinicName.valueEn;
    }
    if (detailClinic && detailClinic.image) {
      background = new Buffer(detailClinic.image, "base64").toString("binary");
    }
    if (detailClinic) {
      contentHTML = detailClinic.contentHTML;
    }
    return (
      <>
        <HomeHeader isNotDisplayBanner={true} />
        <div className="detail_medical-facility">
          <div className="medical_facility-background">
            <img src={background} alt="" />
          </div>
          <div className="medical_facility-introduction">
            <img src={background} alt="" />
            <div className="facility-name-address">
              <p className="facility-name">{facilityName}</p>
              <p className="facility-address">
                <i className="fas fa-map-marker-alt location_logo"></i>
                {facilityAddress}
              </p>
            </div>
          </div>
          <div className="medical_facility-body">
            <div
              className="medical_facility-description"
              dangerouslySetInnerHTML={{ __html: contentHTML }}
            ></div>
            <div className="select-specialty">
              <label>
                <FormattedMessage id={"detail-clinic.select-specialty"} />
              </label>
              <Select
                className="reactSelect"
                value={this.state.selectedSpecialty}
                onChange={this.handleChangeSelectSpecialty}
                options={this.state.arrSpecialty}
              />
            </div>
            <div className="list_doctor">
              {this.state.arrDoctor &&
                this.state.arrDoctor.length > 0 &&
                this.state.arrDoctor.map((item, index) => {
                  if (this.state.selectedSpecialty.value === "ALL") {
                    check = 1;
                    return (
                      <div className="detail_doctor-item" key={index}>
                        <div className="detail_doctor-left">
                          <DoctorInforShowOnSpecialty
                            doctorId={item.doctorId}
                          />
                        </div>
                        <div className="detail_doctor-right">
                          <DoctorSchedule doctorId={item.doctorId} />
                          <DoctorExtraInfor doctorId={item.doctorId} />
                        </div>
                      </div>
                    );
                  }
                  if (item.specialtyId === this.state.selectedSpecialty.value) {
                    check = 1;
                    return (
                      <div className="detail_doctor-item" key={index}>
                        <div className="detail_doctor-left">
                          <DoctorInforShowOnSpecialty
                            doctorId={item.doctorId}
                          />
                        </div>
                        <div className="detail_doctor-right">
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
    specialtyRedux: state.admin.specialty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSpecialtyRedux: () => dispatch(actions.fetchSpecialtyStart()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailMedicalFacility);
