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
      contentHTML: "",
      contentMarkdown: "",
      selectedOption: "",
      description: "",
      arrDoctor: [],
      doctorId: "",
      editOrCreate: "",
    };
  }

  componentDidMount() {
    this.props.getAllDoctorRedux();
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
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
    // console.log(this.state.arrDoctor);
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

  handleEditorChange({ html, text }) {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
  }

  handleChangeSelect = async (selectedOption) => {
    console.log(selectedOption.value);
    this.setState({ selectedOption, doctorId: selectedOption.value });
    await this.props.getDetailDoctorRedux(selectedOption.value);
    let detailDoctor = this.props.detailDoctorRedux;
    this.setState({
      contentHTML: detailDoctor.Markdown.contentHTML
        ? detailDoctor.Markdown.contentHTML
        : "",
      contentMarkdown: detailDoctor.Markdown.contentMarkdown
        ? detailDoctor.Markdown.contentMarkdown
        : "",
      description: detailDoctor.Markdown.description
        ? detailDoctor.Markdown.description
        : "",
      editOrCreate:
        detailDoctor.Markdown.contentHTML ||
        detailDoctor.Markdown.contentMarkdown ||
        detailDoctor.Markdown.description
          ? manageActions.EDIT
          : manageActions.CREATE,
    });
  };

  handleOnchangeDescription(event) {
    this.setState({
      description: event.target.value,
    });
  }
  handleEditOrCreateDetailDoctor = async () => {
    console.log("check state save: ", this.state);
    if (this.state.editOrCreate === manageActions.CREATE) {
      await this.props.createDetailDoctorRedux({
        contentHTML: this.state.contentHTML,
        contentMarkdown: this.state.contentMarkdown,
        description: this.state.description,
        doctorId: this.state.doctorId,
      });
    }
    if (this.state.editOrCreate === manageActions.EDIT) {
      await this.props.editDetailDoctorRedux({
        contentHTML: this.state.contentHTML,
        contentMarkdown: this.state.contentMarkdown,
        description: this.state.description,
        doctorId: this.state.doctorId,
      });
    }
    this.setState({
      contentHTML: "",
      contentMarkdown: "",
      selectedOption: "",
      description: "",
    });
  };
  render() {
    // console.log("render");
    return (
      <div className="manageDoctor">
        <div className="manageDoctor_title">Manage Doctor</div>
        <div className="selectDoctor">
          <span>Select doctor:</span>
          <Select
            className="reactSelect"
            value={this.state.selectedOption}
            onChange={this.handleChangeSelect}
            options={this.state.arrDoctor}
          />
        </div>
        <div className="description">
          <span>Description:</span>
          <textarea
            name=""
            id=""
            cols="50"
            rows="3"
            value={this.state.description}
            onChange={(event) => this.handleOnchangeDescription(event)}
          ></textarea>
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
          {this.state.editOrCreate === manageActions.CREATE
            ? "Create"
            : "Save change"}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctorRedux: () => dispatch(actions.getAllDoctorStart()),
    createDetailDoctorRedux: (data) =>
      dispatch(actions.createDetailDoctorStart(data)),
    editDetailDoctorRedux: (data) =>
      dispatch(actions.editDetailDoctorStart(data)),
    getDetailDoctorRedux: (id) => dispatch(actions.getDetailDoctorStart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
