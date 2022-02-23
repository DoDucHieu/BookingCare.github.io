import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ClinicManage.scss";
import * as actions from "../../../store/actions";
import { CommonUtils, manageActions, LANGUAGES } from "../../../utils";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import _ from "lodash";
import {
  createClinic,
  getDetailClinic,
  editDetailClinic,
} from "../../../services/userService";

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ClinicManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clinicSelected: "",
      arrClinic: [],
      provinceSelected: "",
      arrProvince: [],
      clinicAddress: "",
      contentMarkdown: "",
      contentHTML: "",
      previewImg: "",
      avatar: "",
      editOrCreate: "CREATE",
      clinicData: {},
      isOpen: false,
    };
  }

  componentDidMount() {
    this.props.fetchClinicRedux();
    this.props.fetchProvinceRedux();
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.language !== this.props.language) {
      this.setState({
        arrClinic: this.handleFormatLabelValueOfReactSelect(
          this.props.clinicRedux
        ),
        arrProvince: this.handleFormatLabelValueOfReactSelect(
          this.props.provinceRedux
        ),
      });
    }
    if (prevProps.clinicRedux !== this.props.clinicRedux) {
      this.setState({
        arrClinic: this.handleFormatLabelValueOfReactSelect(
          this.props.clinicRedux
        ),
      });
    }
    if (prevProps.provinceRedux !== this.props.provinceRedux) {
      this.setState({
        arrProvince: this.handleFormatLabelValueOfReactSelect(
          this.props.provinceRedux
        ),
      });
    }
    if (prevProps.clinicDataRedux !== this.props.clinicDataRedux) {
      this.setState({
        clinicData: this.props.clinicDataRedux,
      });
    }
  }

  handleFormatLabelValueOfReactSelect = (data) => {
    let list = [];
    if (data.length > 0) {
      data.map((item, index) => {
        let obj = {};
        obj.label =
          this.props.language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        obj.value = item.keyMap;
        list.push(obj);
      });
    }
    return list;
  };

  handleChangeSelect = async (selectedOption, name) => {
    if (name && name.name === "clinicSelected") {
      let result = await getDetailClinic(selectedOption.value);
      if (result && result.errCode === 0) {
        let selectedProvince = {};
        this.state.arrProvince.forEach((item, index) => {
          if (item.value === result.data.provinceId) {
            selectedProvince = item;
          }
        });
        this.setState({
          clinicSelected: selectedOption,
          provinceSelected: selectedProvince,
          clinicAddress: result.data.clinicAddress,
          contentHTML: result.data.contentHTML,
          contentMarkdown: result.data.contentMarkdown,
          previewImg: new Buffer(result.data.image, "base64").toString(
            "binary"
          ),
          avatar: new Buffer(result.data.image, "base64").toString("binary"),
          editOrCreate: "EDIT",
        });
      } else {
        console.log("ERR form clinic manage:", result.errMessage);
        this.setState({
          clinicSelected: selectedOption,
          provinceSelected: {},
          clinicAddress: "",
          contentHTML: "",
          contentMarkdown: "",
          previewImg: "",
          avatar: "",
          editOrCreate: "CREATE",
        });
      }
    } else {
      this.setState({
        provinceSelected: selectedOption,
      });
    }
  };
  handleChangeInputAddress = (event) => {
    this.setState({
      clinicAddress: event.target.value,
    });
  };
  handleOnchangeImg = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.toBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImg: objectUrl,
        avatar: base64,
      });
    }
  };
  handleOpenPreviewImg = () => {
    if (!this.state.previewImg) return;
    this.setState({
      isOpen: true,
    });
  };
  handleEditorChange({ html, text }) {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
  }

  handleSaveManageSpecialty = async () => {
    let data = {};
    data.clinicId = this.state.clinicSelected.value;
    data.provinceId = this.state.provinceSelected.value;
    data.clinicAddress = this.state.clinicAddress;
    data.contentHTML = this.state.contentHTML;
    data.contentMarkdown = this.state.contentMarkdown;
    data.image = this.state.avatar;
    console.log("check data to server: ", data);

    if (this.state.editOrCreate === "CREATE") {
      let result = await createClinic(data);
      if (result && result.errCode === 0) {
        console.log("Create detail clinic success!");
      } else {
        console.log("Create detail clinic failed!");
      }
    }
    if (this.state.editOrCreate === "EDIT") {
      let result = await editDetailClinic(data);
      if (result && result.errCode === 0) {
        console.log("Edit detail clinic success!");
      } else {
        console.log("Edit detail clinic failed!");
      }
    }
    this.setState({
      contentHTML: "",
      contentMarkdown: "",
      avatar: "",
      previewImg: "",
      clinicSelected: {},
      provinceSelected: {},
      clinicAddress: "",
    });
  };

  render() {
    console.log("check:", this.state);
    return (
      <>
        <div className="clinic_manage">
          <div className="clinic_manage-title">
            <FormattedMessage id={"manage-clinic.title"} />
          </div>
          <div className="select_clinic form-group">
            <label>
              <FormattedMessage id={"manage-clinic.select-clinic"} />
            </label>
            <Select
              className="reactSelect"
              value={this.state.clinicSelected}
              onChange={this.handleChangeSelect}
              options={this.state.arrClinic}
              name={"clinicSelected"}
            />
          </div>
          <div className="select_clinic form-group">
            <label>Chọn tỉnh:</label>
            <Select
              className="reactSelect"
              value={this.state.provinceSelected}
              onChange={this.handleChangeSelect}
              options={this.state.arrProvince}
              name={"provinceSelected"}
            />
          </div>
          <div className="select_clinic form-group col-3">
            <label>Địa chỉ:</label>
            <input
              type="text"
              className="form-control"
              value={this.state.clinicAddress}
              onChange={(event) => this.handleChangeInputAddress(event)}
            />
          </div>
          <div className="row mt-3">
            <div className="form-group col-2">
              <label>
                <FormattedMessage id={"manage-clinic.select-img"} />
              </label>
              <div className="mt-2 UploadImg">
                <input
                  type="file"
                  className="form-control"
                  id="previewImg"
                  hidden
                  onChange={(event) => {
                    this.handleOnchangeImg(event);
                  }}
                />
                <label htmlFor="previewImg" className="mx-2">
                  <i className="fas fa-upload"></i>
                  <FormattedMessage id={"manage-clinic.upload-img"} />
                </label>
              </div>
            </div>
            <div
              className="mt-2 previewImg"
              onClick={() => this.handleOpenPreviewImg()}
            >
              {this.state.previewImg && <img src={this.state.previewImg}></img>}
            </div>
            {this.state.isOpen && (
              <Lightbox
                mainSrc={this.state.previewImg}
                onCloseRequest={() => this.setState({ isOpen: false })}
              />
            )}
          </div>

          <MdEditor
            className="markdown"
            style={{ height: "300px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange.bind(this)}
            value={this.state.contentMarkdown}
          />
          <button
            className="save_manageClinic"
            onClick={() => this.handleSaveManageSpecialty()}
          >
            {this.state.editOrCreate === "CREATE" ? (
              <FormattedMessage id={"manage-clinic.create"} />
            ) : (
              <FormattedMessage id={"manage-clinic.edit"} />
            )}
          </button>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    clinicRedux: state.admin.clinic,
    provinceRedux: state.admin.province,
    clinicDataRedux: state.admin.clinicData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchClinicRedux: () => dispatch(actions.fetchClinicStart()),
    fetchProvinceRedux: () => dispatch(actions.fetchProvinceStart()),
    createDetailSpecialtyRedux: (data) =>
      dispatch(actions.createDetailSpecialtyStart(data)),
    getSpecialtyRedux: (specialtyId) =>
      dispatch(actions.getSpecialtyStart(specialtyId)),
    editSpecialtyRedux: (data) => dispatch(actions.editSpecialtyStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClinicManage);
