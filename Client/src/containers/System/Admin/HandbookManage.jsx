import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./HandbookManage.scss";
import * as actions from "../../../store/actions";
import { CommonUtils, manageActions, LANGUAGES } from "../../../utils";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import Lightbox from "react-image-lightbox";
import _ from "lodash";
import {
  createHandbook,
  getHandbook,
  editHandbook,
} from "../../../services/userService";
import { toast } from "react-toastify";

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class HandbookManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrHandbook: [],
      handbookId: "",
      handbookName: "",
      contentMarkdown: "",
      contentHTML: "",
      editOrCreate: "CREATE",
      previewImg: "",
      avatar: "",
      isOpen: false,
    };
  }

  componentDidMount() {
    this.handleGetHandbook("ALL");
  }
  componentDidUpdate(prevProps, prevState, snapShot) {}

  handleGetHandbook = async (handbookId) => {
    try {
      let result = await getHandbook(handbookId);
      if (result && result.errCode === 0) {
        this.setState({
          arrHandbook: result.data,
        });
        console.log("Get all handbook success!");
      } else {
        console.log("Get all handbook failed!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleEditorChange({ html, text }) {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
  }
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
  handleChangeHandbookName = (event) => {
    this.setState({
      handbookName: event.target.value,
    });
  };
  handleSaveHandbook = async () => {
    let data = {};
    data.handbookName = this.state.handbookName ? this.state.handbookName : "";
    data.handbookId = this.state.handbookId ? this.state.handbookId : "";
    data.handbookImg = this.state.avatar ? this.state.avatar : "";
    data.contentHTML = this.state.contentHTML ? this.state.contentHTML : "";
    data.contentMarkdown = this.state.contentMarkdown
      ? this.state.contentMarkdown
      : "";
    console.log("check state to server:", data);
    if (this.state.editOrCreate === "CREATE") {
      let result = await createHandbook(data);
      if (result && result.errCode === 0) {
        toast.success("CREATE HANDBOOK SUCCESS!");
        this.handleGetHandbook("ALL");
        this.setState({
          handbookId: "",
          handbookName: "",
          contentMarkdown: "",
          contentHTML: "",
          editOrCreate: "CREATE",
          previewImg: "",
          avatar: "",
        });
      } else {
        toast.error("CREATE HANDBOOK FAILED!");
      }
    }
    if (this.state.editOrCreate === "EDIT") {
      let result = await editHandbook(data);
      if (result && result.errCode === 0) {
        toast.success("EDIT HANDBOOK SUCCESS!");
        this.setState({
          handbookId: "",
          handbookName: "",
          contentMarkdown: "",
          contentHTML: "",
          editOrCreate: "CREATE",
          previewImg: "",
          avatar: "",
        });
      } else {
        toast.error("EDIT HANDBOOK FAILED!");
      }
      this.setState({
        editOrCreate: "CREATE",
      });
    }
  };
  handleEditHandbook = (item) => {
    console.log("edit:", item);
    this.setState({
      handbookId: item.id,
      handbookName: item.handbookName,
      contentHTML: item.contentHTML,
      contentMarkdown: item.contentMarkdown,
      previewImg: new Buffer(item.handbookImg, "base64").toString("binary"),
      avatar: new Buffer(item.handbookImg, "base64").toString("binary"),
      editOrCreate: "EDIT",
    });
  };
  render() {
    return (
      <>
        <div className="handbook_manage">
          <div className="handbook_manage-title">
            <FormattedMessage id={"manage-handbook.title"} />
          </div>
          <div className="handbook_name form-group">
            <label>
              <FormattedMessage id={"manage-handbook.name"} />
            </label>
            <input
              type="text"
              className="form-control"
              value={this.state.handbookName ? this.state.handbookName : ""}
              onChange={(event) => this.handleChangeHandbookName(event)}
            />
          </div>

          <div className="row mt-3">
            <div className="form-group col-2">
              <label>
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
            className="save_manageHandbook"
            onClick={() => this.handleSaveHandbook()}
          >
            {this.state.editOrCreate === "CREATE" ? (
              <FormattedMessage id={"manage-handbook.create"} />
            ) : (
              <FormattedMessage id={"manage-handbook.edit"} />
            )}
          </button>
          <div className="patients-table mt-5 mb-5">
            <table id="customers">
              <tbody>
                <tr>
                  <th>Id</th>
                  <th>Handbook's name</th>
                  <th>ACTIONS</th>
                </tr>
                {this.state.arrHandbook &&
                  this.state.arrHandbook.length > 0 &&
                  this.state.arrHandbook.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.handbookName}</td>
                        <td>
                          <button
                            className=" btn btn-primary px-3"
                            onClick={() => this.handleEditHandbook(item)}
                          >
                            {this.props.language === LANGUAGES.VI
                              ? "Sửa"
                              : "Edit"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HandbookManage);
