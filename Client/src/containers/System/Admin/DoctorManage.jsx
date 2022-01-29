import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./DoctorManage.scss";
import * as actions from "../../../store/actions";
import { CommonUtils, manageActions, LANGUAGES } from "../../../utils";
import {
  getAllUsers,
  createNewUser,
  deleteUser,
  editUser,
} from "../../../services/userService";
import UserModal from "./UserModal";
import EditUserModal from "./EditUserModal";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from 'react-select';

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class DoctorManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentHTML:"",
      contentMarkdown:"",
      selectedOption: "",
      description:"",
      arrDoctor:[],
    };
  }

  componentDidMount() {
    this.props.getAllDoctorRedux();
  }
  componentDidUpdate(prevProps,prevState,snapShot){
    if(prevProps.allDoctorRedux !== this.props.allDoctorRedux){
      this.setState({
        arrDoctor:this.handleFullNameDoctor(this.props.allDoctorRedux),
      })
    }
    if(prevProps.language !== this.props.language){
      this.setState({
        arrDoctor:this.handleFullNameDoctor(this.props.allDoctorRedux),
      })
    }
    console.log(this.state.arrDoctor)
  }
  handleFullNameDoctor=(data)=>{
    let listFullNameDoctor=[];
    if(data.length !==0){
      data.map((item,index)=>{
        let obj={};
        let fullNameVi=`${item.lastName} ${item.firstName}`;
        let fullNameEn=`${item.firstName} ${item.lastName}`;
        obj.label=this.props.language ===LANGUAGES.VI ? fullNameVi :fullNameEn;
        obj.value=item.id;
        listFullNameDoctor.push(obj);
      })
    }
    return listFullNameDoctor;
  }

  handleEditorChange({ html, text }) {
    this.setState({
      contentHTML:html,
      contentMarkdown:text,
    })
  }

  handleChange(selectedOption){
    this.setState({ selectedOption }
    );
  };

  handleOnchangeDescription(event){
    this.setState({
      description:event.target.value,
    })
  }
  handleSaveManageDoctor=async()=>{
    // console.log("check state save: ",this.state)
    await this.props.createDetailDoctorRedux(this.state);
    this.setState({
      contentHTML:"",
      contentMarkdown:"",
      selectedOption: "",
      description:"",
    })
  }
  render() {
    return (
      <div className="manageDoctor">
        <div className="manageDoctor_title">
          Manage Doctor
        </div>
        <div className="selectDoctor">
          <span>Select doctor:</span>
          <Select className="reactSelect"
          value={this.state.selectedOption}
          onChange={this.handleChange.bind(this)}
          options={this.state.arrDoctor}
          />
        </div>
        <div className="description">
          <span>Description:</span>
          <textarea name="" id="" cols="50" rows="3" value={this.state.description} onChange={(event)=>this.handleOnchangeDescription(event)}></textarea>
        </div>

        <MdEditor className="markdown"
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={this.handleEditorChange.bind(this)}
        />
        <button className="save_manageDoctor" onClick={()=>this.handleSaveManageDoctor()}>Save</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctorRedux: state.admin.allDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctorRedux: ()=>dispatch(actions.getAllDoctorStart()),
    createDetailDoctorRedux:(data)=>dispatch(actions.createDetailDoctorStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
