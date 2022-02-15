import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./DoctorManage.scss";
import * as actions from "../../../store/actions";
import { CommonUtils, manageActions, LANGUAGES } from "../../../utils";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class DoctorManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorId: "",
      editOrCreate: "CREATE",
      //use for table markdown
      contentHTML: "",
      contentMarkdown: "",
      selectedDoctor: "",
      description: "",
      arrDoctor: [],

      //use for table doctorInfo
      arrProvince: [],
      arrPrice: [],
      arrPaymentMethod: [],
      clinicAddress: "",
      clinicName: "",
      note: "",
      provinceSelected: "",
      priceSelected: "",
      paymentMethodSelected: "",
    };
  }

  componentDidMount() {
    this.props.getAllDoctorRedux();
    this.props.fetchProvinceRedux();
    this.props.fetchPriceRedux();
    this.props.fetchPaymentMethodRedux();
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.allDoctorRedux !== this.props.allDoctorRedux) {
      this.setState({
        arrDoctor: this.handleFormatLabelValueOfReactSelect(
          this.props.allDoctorRedux,
          "doctor"
        ),
      });
    }
    if (prevProps.language !== this.props.language) {
      let detailDoctor = this.handleFormatDetailDoctor(
        this.props.detailDoctorRedux
      );
      this.setState({
        arrDoctor: this.handleFormatLabelValueOfReactSelect(
          this.props.allDoctorRedux,
          "doctor"
        ),
        arrProvince: this.handleFormatLabelValueOfReactSelect(
          this.props.provinceRedux,
          ""
        ),
        arrPrice: this.handleFormatLabelValueOfReactSelect(
          this.props.priceRedux,
          ""
        ),
        arrPaymentMethod: this.handleFormatLabelValueOfReactSelect(
          this.props.paymentMethodRedux,
          ""
        ),
        ...detailDoctor,
      });
    }
    if (prevProps.provinceRedux !== this.props.provinceRedux) {
      this.setState({
        arrProvince: this.handleFormatLabelValueOfReactSelect(
          this.props.provinceRedux,
          ""
        ),
      });
    }
    if (prevProps.priceRedux !== this.props.priceRedux) {
      this.setState({
        arrPrice: this.handleFormatLabelValueOfReactSelect(
          this.props.priceRedux,
          ""
        ),
      });
    }
    if (prevProps.paymentMethodRedux !== this.props.paymentMethodRedux) {
      this.setState({
        arrPaymentMethod: this.handleFormatLabelValueOfReactSelect(
          this.props.paymentMethodRedux,
          ""
        ),
      });
    }
    if (prevProps.detailDoctorRedux !== this.props.detailDoctorRedux) {
      let detailDoctor = this.handleFormatDetailDoctor(
        this.props.detailDoctorRedux
      );
      this.setState(detailDoctor, () => {
        console.log("did update detail doctor check: ", this.state);
      });
    }
  }
  handleFormatLabelValueOfReactSelect = (data, type) => {
    let list = [];
    if (data.length > 0) {
      data.map((item, index) => {
        let obj = {};
        let fullNameVi =
          type === "doctor" ? `${item.lastName} ${item.firstName}` : "";
        let fullNameEn =
          type === "doctor" ? `${item.firstName} ${item.lastName}` : "";
        obj.label =
          this.props.language === LANGUAGES.VI
            ? type === "doctor"
              ? fullNameVi
              : item.valueVi
            : type === "doctor"
            ? fullNameEn
            : item.valueEn;
        obj.value = type === "doctor" ? item.id : item.keyMap;
        list.push(obj);
      });
    }
    return list;
  };

  handleEditorChange({ html, text }) {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
  }
  handleFormatDetailDoctor = (detailDoctor) => {
    let obj = {};
    let selectOptionPvovince = {};
    let selectOptionPrice = {};
    let selectOptionPayment = {};

    selectOptionPvovince.label =
      this.props.language === LANGUAGES.VI
        ? detailDoctor.DoctorInfor.provinceData.valueVi
        : detailDoctor.DoctorInfor.provinceData.valueEn;
    selectOptionPvovince.value = detailDoctor.DoctorInfor.provinceData.keyMap;

    selectOptionPrice.label =
      this.props.language === LANGUAGES.VI
        ? detailDoctor.DoctorInfor.priceData.valueVi
        : detailDoctor.DoctorInfor.priceData.valueEn;
    selectOptionPrice.value = detailDoctor.DoctorInfor.priceData.keyMap;

    selectOptionPayment.label =
      this.props.language === LANGUAGES.VI
        ? detailDoctor.DoctorInfor.paymentData.valueVi
        : detailDoctor.DoctorInfor.paymentData.valueEn;
    selectOptionPayment.value = detailDoctor.DoctorInfor.paymentData.keyMap;

    obj.contentHTML = detailDoctor.Markdown.contentHTML
      ? detailDoctor.Markdown.contentHTML
      : "";
    obj.contentMarkdown = detailDoctor.Markdown.contentMarkdown
      ? detailDoctor.Markdown.contentMarkdown
      : "";
    obj.description = detailDoctor.Markdown.description
      ? detailDoctor.Markdown.description
      : "";
    obj.provinceSelected = selectOptionPvovince;
    obj.priceSelected = selectOptionPrice;
    obj.paymentMethodSelected = selectOptionPayment;
    obj.clinicName = detailDoctor.DoctorInfor.nameClinic
      ? detailDoctor.DoctorInfor.nameClinic
      : "";
    obj.clinicAddress = detailDoctor.DoctorInfor.addressClinic
      ? detailDoctor.DoctorInfor.addressClinic
      : "";
    obj.note = detailDoctor.DoctorInfor.note
      ? detailDoctor.DoctorInfor.note
      : "";
    obj.editOrCreate =
      detailDoctor.Markdown.contentHTML ||
      detailDoctor.Markdown.contentMarkdown ||
      detailDoctor.Markdown.description ||
      detailDoctor.DoctorInfor.provinceId ||
      detailDoctor.DoctorInfor.priceId ||
      detailDoctor.DoctorInfor.paymentId ||
      detailDoctor.DoctorInfor.nameClinic ||
      detailDoctor.DoctorInfor.addressClinic ||
      detailDoctor.DoctorInfor.note
        ? manageActions.EDIT
        : manageActions.CREATE;

    return obj;
  };
  handleChangeSelect = async (selectedOption, name) => {
    console.log("selectedOption check:", selectedOption, name.name);
    if (name && name.name === "selectedDoctor") {
      this.setState({
        selectedDoctor: selectedOption,
        doctorId: selectedOption.value,
      });
      await this.props.getDetailDoctorRedux(selectedOption.value);
    } else {
      let stateName = name.name;
      let stateCopy = { ...this.state };
      stateCopy[stateName] = selectedOption;
      this.setState({
        ...stateCopy,
      });
    }
  };

  handleOnchangeDescription(event) {
    this.setState({
      description: event.target.value,
    });
  }

  handleOnchangeDoctorInfor = (event, type) => {
    console.log(type, " ", event.target.value);
    let stateCopy = { ...this.state };
    stateCopy[type] = event.target.value;
    console.log(stateCopy, this.state);
    this.setState({
      ...stateCopy,
    });
  };

  handleEditOrCreateDetailDoctor = async () => {
    console.log("check state save: ", this.state);
    await this.props.editOrCreateDetailDoctorRedux({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.doctorId,
      priceId: this.state.priceSelected.value,
      provinceId: this.state.provinceSelected.value,
      paymentId: this.state.paymentMethodSelected.value,
      nameClinic: this.state.clinicName,
      addressClinic: this.state.clinicAddress,
      note: this.state.note,
    });
    this.setState({
      contentHTML: "",
      contentMarkdown: "",
      selectedDoctor: "",
      description: "",
      priceSelected: "",
      provinceSelected: "",
      paymentMethodSelected: "",
      clinicName: "",
      clinicAddress: "",
      note: "",
    });
  };
  render() {
    console.log("render:", this.state);
    let { arrProvince, arrPrice, arrPaymentMethod } = this.state;
    return (
      <div className="manageDoctor">
        <div className="manageDoctor_title">
          <FormattedMessage id={"manage-doctor.title"} />
        </div>
        <div className="selectDoctor">
          <span>
            {" "}
            <FormattedMessage id={"manage-doctor.select-doctor"} />
          </span>
          <Select
            className="reactSelect"
            value={this.state.selectedDoctor}
            onChange={this.handleChangeSelect}
            options={this.state.arrDoctor}
            name={"selectedDoctor"}
          />
        </div>
        <div className="description">
          <span>
            {" "}
            <FormattedMessage id={"manage-doctor.description"} />
          </span>
          <textarea
            name=""
            id=""
            cols="50"
            rows="2"
            value={this.state.description}
            onChange={(event) => this.handleOnchangeDescription(event)}
          ></textarea>
        </div>
        <div className="doctor_info">
          <div className="row mt-3 col-6">
            <div className="form-group col-4">
              <label>
                <FormattedMessage id="manage-doctor.clinic-name" />
              </label>
              <input
                type="text"
                className="form-control"
                id=""
                value={this.state.clinicName}
                onChange={(event) =>
                  this.handleOnchangeDoctorInfor(event, "clinicName")
                }
              />
            </div>
            <div className="form-group col-4">
              <label>
                <FormattedMessage id="manage-doctor.clinic-address" />
              </label>
              <input
                type="text"
                className="form-control"
                id=""
                value={this.state.clinicAddress}
                onChange={(event) =>
                  this.handleOnchangeDoctorInfor(event, "clinicAddress")
                }
              />
            </div>
            <div className="form-group col-4">
              <label>
                <FormattedMessage id="manage-doctor.note" />
              </label>
              <input
                type="text"
                className="form-control"
                id=""
                value={this.state.note}
                onChange={(event) =>
                  this.handleOnchangeDoctorInfor(event, "note")
                }
              />
            </div>
          </div>
          <div className="row mt-3 col-6 mb-4">
            <div className="form-group col-4">
              <label>
                <FormattedMessage id="manage-doctor.select-province" />
              </label>
              <Select
                className="reactSelect"
                value={this.state.provinceSelected}
                onChange={this.handleChangeSelect}
                options={this.state.arrProvince}
                name={"provinceSelected"}
              />
            </div>
            <div className="form-group col-4">
              <label>
                <FormattedMessage id="manage-doctor.select-price" />
              </label>
              <Select
                className="reactSelect"
                value={this.state.priceSelected}
                onChange={this.handleChangeSelect}
                options={this.state.arrPrice}
                name={"priceSelected"}
              />
            </div>
            <div className="form-group col-4">
              <label>
                <FormattedMessage id="manage-doctor.payment-method" />
              </label>
              <Select
                className="reactSelect"
                value={this.state.paymentMethodSelected}
                onChange={this.handleChangeSelect}
                options={this.state.arrPaymentMethod}
                name={"paymentMethodSelected"}
              />
            </div>
          </div>
        </div>
        <MdEditor
          className="markdown"
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={this.handleEditorChange.bind(this)}
          value={this.state.contentMarkdown}
        />
        <button
          className="save_manageDoctor"
          onClick={() => this.handleEditOrCreateDetailDoctor()}
        >
          {this.state.editOrCreate === manageActions.CREATE ? (
            <FormattedMessage id={"manage-doctor.create"} />
          ) : (
            <FormattedMessage id={"manage-doctor.save-change"} />
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctorRedux: state.admin.allDoctor,
    detailDoctorRedux: state.admin.detailDoctor,
    provinceRedux: state.admin.province,
    priceRedux: state.admin.price,
    paymentMethodRedux: state.admin.paymentMethod,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctorRedux: () => dispatch(actions.getAllDoctorStart()),
    editOrCreateDetailDoctorRedux: (data) =>
      dispatch(actions.editOrCreateDetailDoctorStart(data)),
    getDetailDoctorRedux: (id) => dispatch(actions.getDetailDoctorStart(id)),
    fetchProvinceRedux: () => dispatch(actions.fetchProvinceStart()),
    fetchPriceRedux: () => dispatch(actions.fetchPriceStart()),
    fetchPaymentMethodRedux: () => dispatch(actions.fetchPaymentMethodStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
