import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, path } from "../../../utils";
import { withRouter } from "react-router";
import "./DoctorExtraInfor.scss";
import * as actions from "../../../store/actions";
import NumberFormat from "react-number-format";

class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailPrice: false,
      doctorId: this.props.doctorId,
      doctorExtraInfor: {},
      clinicName: "",
      clinicAddress: "",
      note: "",
      price: "",
    };
  }

  componentDidMount() {
    this.props.fetchDoctorExtraInforRedux(this.state.doctorId);
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.doctorExtraInforRedux !== this.props.doctorExtraInforRedux) {
      this.setState({
        doctorExtraInfor: this.props.doctorExtraInforRedux,
      });
    }
  }
  handleShowHidePrice = () => {
    this.setState({
      isShowDetailPrice: !this.state.isShowDetailPrice,
    });
  };
  render() {
    console.log("check state doctorExtraInfor: ", this.state);
    let { doctorExtraInfor } = this.state;
    return (
      <>
        <div className="doctorExtraInfor">
          <p className="doctorExtraInfor_title">
            <FormattedMessage id={"doctor-extra-infor.examination-address"} />
          </p>
          <p className="clinic_name">
            {doctorExtraInfor && doctorExtraInfor.nameClinic}
          </p>
          <p className="clinic_address">
            {doctorExtraInfor && doctorExtraInfor.addressClinic}
          </p>
          <div className="price">
            {this.state.isShowDetailPrice === false ? (
              <div className="price_brief">
                <p className="price_title">
                  {" "}
                  <FormattedMessage
                    id={"doctor-extra-infor.examination-price"}
                  />
                </p>
                <p className="price_number">
                  {doctorExtraInfor &&
                    doctorExtraInfor.priceData &&
                    (this.props.language === LANGUAGES.EN ? (
                      <NumberFormat
                        value={doctorExtraInfor.priceData.valueEn}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={"$"}
                      />
                    ) : (
                      <NumberFormat
                        value={doctorExtraInfor.priceData.valueVi}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={"VNĐ"}
                      />
                    ))}
                </p>

                <span
                  className="showHide_detail-price"
                  onClick={() => this.handleShowHidePrice()}
                >
                  <FormattedMessage id={"doctor-extra-infor.more-detail"} />
                </span>
              </div>
            ) : (
              <div className="price_detail">
                <p className="price_title">
                  <FormattedMessage
                    id={"doctor-extra-infor.examination-price"}
                  />
                </p>
                <div className="price_table-detail">
                  <div className="price_table-detail-top">
                    <span>
                      <FormattedMessage
                        id={"doctor-extra-infor.examination-price"}
                      />
                    </span>
                    <p className="price_number">
                      {doctorExtraInfor &&
                        doctorExtraInfor.priceData &&
                        (this.props.language === LANGUAGES.EN ? (
                          <NumberFormat
                            value={doctorExtraInfor.priceData.valueEn}
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={"$"}
                          />
                        ) : (
                          <NumberFormat
                            value={doctorExtraInfor.priceData.valueVi}
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={"VNĐ"}
                          />
                        ))}
                    </p>
                  </div>
                  <p className="price_desciption">
                    {doctorExtraInfor && doctorExtraInfor.note}
                  </p>
                  <p className="payment">
                    <FormattedMessage
                      id={"doctor-extra-infor.payment-method"}
                    />
                    {doctorExtraInfor &&
                      doctorExtraInfor.paymentData &&
                      (this.props.language === LANGUAGES.EN
                        ? doctorExtraInfor.paymentData.valueEn
                        : doctorExtraInfor.paymentData.valueVi)}
                  </p>
                </div>
                <span
                  className="showHide_detail-price"
                  onClick={() => this.handleShowHidePrice()}
                >
                  <FormattedMessage id={"doctor-extra-infor.hide-detail"} />
                </span>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    doctorExtraInforRedux: state.admin.doctorExtraInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) =>
      dispatch(actions.changeLanguageApp(language)),
    fetchDoctorExtraInforRedux: (doctorId) =>
      dispatch(actions.fetchDoctorExtraInforStart(doctorId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
