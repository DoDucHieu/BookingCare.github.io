import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./SpecialtyManage.scss";
import * as actions from "../../../store/actions";
import { CommonUtils, manageActions, LANGUAGES } from "../../../utils";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import _ from "lodash";

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class SpecialtyManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specialtySelected: "",
      arrSpecialty: [],
      specialtyData: {},
      contentMarkdown: "",
      contentHTML: "",
      editOrCreate: "CREATE",
      previewImg: "",
      avatar: "",
      isOpen: false,
    };
  }

  componentDidMount() {
    this.props.fetchSpecialtyRedux();
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.language !== this.props.language) {
      this.setState({
        arrSpecialty: this.handleFormatLabelValueOfReactSelect(
          this.props.specialtyRedux
        ),
      });
    }
    if (prevProps.specialtyRedux !== this.props.specialtyRedux) {
      this.setState({
        arrSpecialty: this.handleFormatLabelValueOfReactSelect(
          this.props.specialtyRedux
        ),
      });
    }
    if (prevProps.specialtyDataRedux !== this.props.specialtyDataRedux) {
      this.setState({
        specialtyData: this.props.specialtyDataRedux,
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

  handleChangeSelect = async (selectedOption) => {
    await this.props.getSpecialtyRedux(selectedOption.value);
    if (this.state.specialtyData && !_.isEmpty(this.state.specialtyData)) {
      this.setState({
        specialtySelected: selectedOption,
        contentHTML: this.state.specialtyData.contentHTML,
        contentMarkdown: this.state.specialtyData.contentMarkdown,
        previewImg: new Buffer(
          this.state.specialtyData.image,
          "base64"
        ).toString("binary"),
        avatar: new Buffer(this.state.specialtyData.image, "base64").toString(
          "binary"
        ),
        editOrCreate: "EDIT",
      });
    } else {
      this.setState({
        specialtySelected: selectedOption,
        contentMarkdown: "",
        contentHTML: "",
        previewImg: "",
        editOrCreate: "CREATE",
      });
    }
  };

  handleOnchangeImg = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.toBase64(file);
      //   console.log("check base64 handleOnchange: ", base64);
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
    data.specialtyId = this.state.specialtySelected.value;
    data.contentHTML = this.state.contentHTML;
    data.contentMarkdown = this.state.contentMarkdown;
    data.image = this.state.avatar;
    console.log("check data to server: ", data);
    if (this.state.editOrCreate === "CREATE") {
      await this.props.createDetailSpecialtyRedux(data);
    }
    if (this.state.editOrCreate === "EDIT") {
      await this.props.editSpecialtyRedux(data);
    }
    this.setState({
      contentHTML: "",
      contentMarkdown: "",
      previewImg: "",
      specialtySelected: {},
    });
  };

  render() {
    console.log("check:", this.state);
    return (
      <>
        <div className="specialty_manage">
          <div className="specialty_manage-title">
            <FormattedMessage id={"manage-specialty.title"} />
          </div>
          <div className="select_specialty form-group">
            <label>
              {" "}
              <FormattedMessage id={"manage-specialty.select-specialty"} />
            </label>
            <Select
              className="reactSelect"
              value={this.state.specialtySelected}
              onChange={this.handleChangeSelect}
              options={this.state.arrSpecialty}
            />
          </div>
          <div className="row mt-3">
            <div className="form-group col-2">
              <label>
                {" "}
                <FormattedMessage id={"manage-specialty.select-img"} />
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
                  <FormattedMessage id={"manage-specialty.upload-img"} />
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
            className="save_manageSpecialty"
            onClick={() => this.handleSaveManageSpecialty()}
          >
            {this.state.editOrCreate === "CREATE" ? (
              <FormattedMessage id={"manage-specialty.create"} />
            ) : (
              <FormattedMessage id={"manage-specialty.edit"} />
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
    specialtyRedux: state.admin.specialty,
    specialtyDataRedux: state.admin.specialtyData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSpecialtyRedux: () => dispatch(actions.fetchSpecialtyStart()),
    createDetailSpecialtyRedux: (data) =>
      dispatch(actions.createDetailSpecialtyStart(data)),
    getSpecialtyRedux: (specialtyId) =>
      dispatch(actions.getSpecialtyStart(specialtyId)),
    editSpecialtyRedux: (data) => dispatch(actions.editSpecialtyStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyManage);
