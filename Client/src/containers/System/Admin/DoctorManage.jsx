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
import { getDetailDoctor } from "../../../services/userService";

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
      arrPrice: [],
      arrPaymentMethod: [],
      arrSpecialty: [],
      arrClinic: [],
      note: "",
      priceSelected: "",
      paymentMethodSelected: "",
      specialtySelected: "",
      clinicSelected: "",
    };
  }

  componentDidMount() {
    this.props.getAllDoctorRedux();
    this.props.fetchPriceRedux();
    this.props.fetchPaymentMethodRedux();
    this.props.fetchSpecialtyRedux();
    this.props.fetchClinicRedux();
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
      this.setState({
        arrDoctor: this.handleFormatLabelValueOfReactSelect(
          this.props.allDoctorRedux,
          "doctor"
        ),
        arrPrice: this.handleFormatLabelValueOfReactSelect(
          this.props.priceRedux,
          ""
        ),
        arrPaymentMethod: this.handleFormatLabelValueOfReactSelect(
          this.props.paymentMethodRedux,
          ""
        ),
        arrClinic: this.handleFormatLabelValueOfReactSelect(
          this.props.clinicRedux,
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
    if (prevProps.specialtyRedux !== this.props.specialtyRedux) {
      this.setState({
        arrSpecialty: this.handleFormatLabelValueOfReactSelect(
          this.props.specialtyRedux,
          ""
        ),
      });
    }
    if (prevProps.clinicRedux !== this.props.clinicRedux) {
      this.setState({
        arrClinic: this.handleFormatLabelValueOfReactSelect(
          this.props.clinicRedux,
          ""
        ),
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
  handleChangeSelect = async (selectedOption, name) => {
    this.setState({
      selectedDoctor: selectedOption,
      doctorId: selectedOption.value,
      clinicSelected: {},
      specialtySelected: {},
      priceSelected: {},
      paymentMethodSelected: {},
      note: "",
      contentHTML: "",
      contentMarkdown: "",
      description: "",
      editOrCreate: "CREATE",
    });
    if (name && name.name === "selectedDoctor") {
      let result = await getDetailDoctor(selectedOption.value);
      if (result && result.errCode === 0) {
        let clinic,
          specialty,
          price,
          paymentMethod = "";
        let { arrClinic, arrSpecialty, arrPrice, arrPaymentMethod } =
          this.state;
        arrClinic.forEach((item, index) => {
          if (item.value === result.data.DoctorInfor.clinicId) {
            clinic = item;
          }
        });
        arrSpecialty.forEach((item, index) => {
          if (item.value === result.data.DoctorInfor.specialtyId) {
            specialty = item;
          }
        });
        arrPrice.forEach((item, index) => {
          if (item.value === result.data.DoctorInfor.priceId) {
            price = item;
          }
        });
        arrPaymentMethod.forEach((item, index) => {
          if (item.value === result.data.DoctorInfor.paymentId) {
            paymentMethod = item;
          }
        });
        this.setState({
          selectedDoctor: selectedOption,
          doctorId: selectedOption.value,
          clinicSelected: clinic,
          specialtySelected: specialty,
          priceSelected: price,
          paymentMethodSelected: paymentMethod,
          note: result.data.DoctorInfor.note,
          contentHTML: result.data.Markdown.contentHTML,
          contentMarkdown: result.data.Markdown.contentMarkdown,
          description: result.data.Markdown.description,
          editOrCreate: "EDIT",
        });
      }
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

  handleOnchangeNoteDoctor = (event) => {
    this.setState({
      note: event.target.value,
    });
  };

  handleEditOrCreateDetailDoctor = async () => {
    let data = {
      doctorId: this.state.doctorId,
      specialtyId: this.state.specialtySelected
        ? this.state.specialtySelected.value
        : "",
      clinicId: this.state.clinicSelected
        ? this.state.clinicSelected.value
        : "",
      priceId: this.state.priceSelected ? this.state.priceSelected.value : "",
      paymentId: this.state.paymentMethodSelected
        ? this.state.paymentMethodSelected.value
        : "",
      description: this.state.description,
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      note: this.state.note ? this.state.note : "",
    };
    console.log("check state save: ", data);
    await this.props.editOrCreateDetailDoctorRedux(data);
    this.setState({
      selectedDoctor: {},
      specialtySelected: {},
      clinicSelected: {},
      priceSelected: {},
      paymentMethodSelected: {},
      description: "",
      contentHTML: "",
      contentMarkdown: "",
      note: "",
      editOrCreate: "CREATE",
    });
  };
  render() {
    console.log("render:", this.state);
    let { arrPrice, arrPaymentMethod } = this.state;
    return (
      <div className="manageDoctor">
        <div className="manageDoctor_title">
          <FormattedMessage id={"manage-doctor.title"} />
        </div>
        <div className="select_group row mt-3">
          <div className="form-group col-3">
            <span>
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
          <div className="form-group col-3">
            <label>
              <FormattedMessage id="manage-doctor.select-specialty" />
            </label>
            <Select
              className="reactSelect"
              value={this.state.specialtySelected}
              onChange={this.handleChangeSelect}
              options={this.state.arrSpecialty}
              name={"specialtySelected"}
            />
          </div>

          <div className="form-group col-3">
            <label>Chọn phòng khám:</label>
            <Select
              className="reactSelect"
              value={this.state.clinicSelected}
              onChange={this.handleChangeSelect}
              options={this.state.arrClinic}
              name={"clinicSelected"}
            />
          </div>
        </div>
        <div className="description form-group mt-3">
          <label>
            <FormattedMessage id={"manage-doctor.description"} />
          </label>
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
          <div className="row mt-3 mb-3">
            <div className="form-group col-3">
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
            <div className="form-group col-3">
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
            <div className="form-group col-3">
              <label>
                <FormattedMessage id="manage-doctor.note" />
              </label>
              <input
                type="text"
                className="form-control"
                id=""
                value={this.state.note}
                onChange={(event) => this.handleOnchangeNoteDoctor(event)}
              />
            </div>
          </div>
        </div>
        <MdEditor
          className="markdown"
          style={{ height: "300px" }}
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
    priceRedux: state.admin.price,
    paymentMethodRedux: state.admin.paymentMethod,
    specialtyRedux: state.admin.specialty,
    clinicRedux: state.admin.clinic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctorRedux: () => dispatch(actions.getAllDoctorStart()),
    editOrCreateDetailDoctorRedux: (data) =>
      dispatch(actions.editOrCreateDetailDoctorStart(data)),
    getDetailDoctorRedux: (id) => dispatch(actions.getDetailDoctorStart(id)),
    fetchPriceRedux: () => dispatch(actions.fetchPriceStart()),
    fetchPaymentMethodRedux: () => dispatch(actions.fetchPaymentMethodStart()),
    fetchSpecialtyRedux: () => dispatch(actions.fetchSpecialtyStart()),
    fetchClinicRedux: () => dispatch(actions.fetchClinicStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
