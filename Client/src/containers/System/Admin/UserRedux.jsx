import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { CommonUtils, manageActions, LANGUAGES } from "../../../utils";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender: "",
      roleId: "",
      positionId: "",
      previewImg: "",
      genderArr: [],
      roleArr: [],
      positionArr: [],
      userArr: [],
      isOpen: false,
      editOrCreateUser: manageActions.CREATE,
      avatar: "",
    };
  }
  componentDidMount() {
    console.log("didMount");
    this.props.getGenderFromRedux();
    this.props.getPositionFromRedux();
    this.props.getRoleFromRedux();
    this.props.getAllUserFromRedux();
  }

  componentDidUpdate(prevProps, prevState, snapShot) {
    console.log("didUpdate");
    if (prevProps.genderRedux !== this.props.genderRedux) {
      console.log("check gender");
      let arrGender = this.props.genderRedux;
      this.setState({
        genderArr: arrGender,
        gender: arrGender && arrGender.length > 0 ? arrGender[0].key : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      console.log("check position");

      let arrPosition = this.props.positionRedux;
      this.setState({
        positionArr: arrPosition,
        positionId:
          arrPosition && arrPosition.length > 0 ? arrPosition[0].key : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      console.log("check role");

      let arrRole = this.props.roleRedux;
      this.setState({
        roleArr: arrRole,
        roleId: arrRole && arrRole.length > 0 ? arrRole[0].key : "",
      });
    }
    if (prevProps.userRedux !== this.props.userRedux) {
      let arrUser = this.props.userRedux;
      this.setState({
        userArr: arrUser,
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
        gender: "M",
        roleId: "R1",
        positionId: "P0",
        editOrCreateUser: manageActions.CREATE,
        previewImg: "",
      });
    }
  }

  handleOnchangeImg = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.toBase64(file);
      console.log("check base64 handleOnchange: ", base64);
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
  handleOnchangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    console.log(event.target.value);
    this.setState({
      ...copyState,
    });
  };
  validateInput = () => {
    let arr = [
      "email",
      "password",
      "firstName",
      "lastName",
      "address",
      "phoneNumber",
    ];
    let copyState = { ...this.state };
    for (let i = 0; i < arr.length; i++) {
      if (copyState[arr[i]] === "") {
        alert("Missing parameter " + arr[i]);
        return false;
      }
    }
  };
  handleCreateUser = async (event) => {
    event.preventDefault();
    if (this.validateInput() === false) {
      return;
    }
    await this.props.createNewUserFromRedux(this.state);
    console.log("new state: ", this.state);
  };
  handleOnClickDeleteUser = (event, id) => {
    this.props.deleteUserFromRedux(id);
    event.preventDefault();
  };
  handleOnclickEditUser = (e, user) => {
    console.log(user);
    let imgBase64 = "";
    if (user.image) {
      // imgBase64 = new Buffer.from(user.image).toString("base64");
      imgBase64 = new Buffer(user.image, "base64").toString("binary");
      console.log("check base64:", imgBase64);
    }
    e.preventDefault();
    this.setState({ ...user, editOrCreateUser: "EDIT", previewImg: imgBase64 });
  };
  handleSaveEditUser = (event) => {
    this.props.editUserFromRedux(this.state);
    event.preventDefault();
  };
  render() {
    console.log("render");
    let genderArr = this.state.genderArr;
    let isLoadingGender = this.props.isLoadingGender;
    let positionArr = this.state.positionArr;
    let roleArr = this.state.roleArr;
    let userArr = this.state.userArr;

    return (
      <form className="container">
        <div>{isLoadingGender === true ? "Gender is loading...!" : ""}</div>
        <div className="row mt-5">
          <div className="form-group col-6">
            <label>
              <FormattedMessage id="manage-user.email" />
            </label>
            <input
              type="email"
              className="form-control"
              id=""
              placeholder="Email"
              value={this.state.email}
              onChange={(event) => {
                this.handleOnchangeInput(event, "email");
              }}
              {...(this.state.editOrCreateUser === manageActions.EDIT
                ? { disabled: true }
                : { disabled: false })}
            />
          </div>
          <div className="form-group col-6">
            <label>
              <FormattedMessage id="manage-user.password" />
            </label>
            <input
              type="password"
              className="form-control"
              id=""
              placeholder="Password"
              value={this.state.password}
              onChange={(event) => {
                this.handleOnchangeInput(event, "password");
              }}
              {...(this.state.editOrCreateUser === manageActions.EDIT
                ? { disabled: true }
                : { disabled: false })}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="form-group col-6">
            <label>
              <FormattedMessage id="manage-user.first-name" />
            </label>
            <input
              type="text"
              className="form-control"
              id=""
              placeholder="First name"
              value={this.state.firstName}
              onChange={(event) => {
                this.handleOnchangeInput(event, "firstName");
              }}
            />
          </div>
          <div className="form-group col-6">
            <label>
              <FormattedMessage id="manage-user.last-name" />
            </label>
            <input
              type="text"
              className="form-control"
              id=""
              placeholder="Last name"
              value={this.state.lastName}
              onChange={(event) => {
                this.handleOnchangeInput(event, "lastName");
              }}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="form-group col-6">
            <label>
              <FormattedMessage id="manage-user.address" />
            </label>
            <input
              type="text"
              className="form-control"
              id="inputAddress"
              value={this.state.address}
              onChange={(event) => {
                this.handleOnchangeInput(event, "address");
              }}
            />
          </div>
          <div className="form-group col-6">
            <label>
              <FormattedMessage id="manage-user.phone-number" />
            </label>
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              value={this.state.phoneNumber}
              onChange={(event) => {
                this.handleOnchangeInput(event, "phoneNumber");
              }}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="form-group col-4">
            <label>
              <FormattedMessage id="manage-user.gender" />
            </label>
            <select
              id="inputState"
              className="form-control"
              value={this.state.gender}
              onChange={(event) => {
                this.handleOnchangeInput(event, "gender");
              }}
            >
              {genderArr &&
                genderArr.length !== 0 &&
                genderArr.map((item, index) => {
                  return (
                    <option key={index} value={item.keyMap}>
                      {this.props.language === "en"
                        ? item.valueEn
                        : item.valueVi}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="form-group col-4">
            <label>
              <FormattedMessage id="manage-user.role" />
            </label>
            <select
              id="inputState"
              value={this.state.roleId}
              className="form-control"
              onChange={(event) => {
                this.handleOnchangeInput(event, "roleId");
              }}
            >
              {roleArr &&
                roleArr.length !== 0 &&
                roleArr.map((item, index) => {
                  return (
                    <option key={index} value={item.keyMap}>
                      {this.props.language === LANGUAGES.EN
                        ? item.valueEn
                        : item.valueVi}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="form-group col-4">
            <label>
              <FormattedMessage id="manage-user.position" />
            </label>
            <select
              id="inputState"
              className="form-control"
              value={this.state.positionId}
              onChange={(event) => {
                this.handleOnchangeInput(event, "positionId");
              }}
            >
              {positionArr &&
                positionArr.length !== 0 &&
                positionArr.map((item, index) => {
                  return (
                    <option key={index} value={item.keyMap}>
                      {this.props.language === LANGUAGES.EN
                        ? item.valueEn
                        : item.valueVi}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
        <div className="row mt-3">
          <div className="form-group col-2">
            <label>
              <FormattedMessage id="manage-user.image" />
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
                <FormattedMessage id="manage-user.upload-image" />
              </label>
            </div>
          </div>
          <div
            className="mt-2 previewImg"
            onClick={() => {
              this.handleOpenPreviewImg();
            }}
          >
            {this.state.previewImg && <img src={this.state.previewImg}></img>}
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary  px-3"
          onClick={(event) =>
            this.state.editOrCreateUser === manageActions.EDIT
              ? this.handleSaveEditUser(event)
              : this.handleCreateUser(event)
          }
        >
          <FormattedMessage
            id={
              this.state.editOrCreateUser === manageActions.EDIT
                ? "manage-user.save-change"
                : "manage-user.create-user"
            }
          />
        </button>
        {this.state.isOpen && (
          <Lightbox
            mainSrc={this.state.previewImg}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}

        <div className="users-table mt-5 mb-5">
          <table id="customers">
            <tbody>
              <tr>
                <th>EMAIL</th>
                <th>FIRST NAME</th>
                <th>LAST NAME</th>
                <th>ADDRESS</th>
                <th>ACTIONS</th>
              </tr>
              {userArr &&
                userArr.length !== 0 &&
                userArr.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={(e) => this.handleOnclickEditUser(e, item)}
                        >
                          <i className="fas fa-user-edit"></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={(event) => {
                            this.handleOnClickDeleteUser(event, item.id);
                          }}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("mapStateToProps: ", state.admin);
  return {
    genderRedux: state.admin.genders,
    isLoadingGender: state.admin.isLoadingGender,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roles,
    userRedux: state.admin.users,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log("mapDispatchToProps");
  return {
    getGenderFromRedux: () => dispatch(actions.fetchGenderStart()),
    getPositionFromRedux: () => dispatch(actions.fetchPositionStart()),
    getRoleFromRedux: () => dispatch(actions.fetchRoleStart()),
    createNewUserFromRedux: (data) =>
      dispatch(actions.createNewUserStart(data)),
    getAllUserFromRedux: () => dispatch(actions.getAllUserStart()),
    deleteUserFromRedux: (id) => dispatch(actions.deleteUserStart(id)),
    editUserFromRedux: (data) => dispatch(actions.editUserStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
