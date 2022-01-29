import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./userManage.scss";
import {
  getAllUsers,
  createNewUser,
  deleteUser,
  editUser,
} from "../../../services/userService";
import UserModal from "./UserModal";
import EditUserModal from "./EditUserModal";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenUserModal: false,
      isOpenEditUserModal: false,
      oldDataToEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
  }
  getAllUsersFromReact = async () => {
    let response = await getAllUsers("ALL");
    // console.log(response);
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.user,
      });
    }
  };
  createNewUserFromReact = async (data) => {
    try {
      let response = await createNewUser(data);
      if (response && response.errCode === 0) {
        await this.getAllUsersFromReact();
        this.setState({
          isOpenUserModal: false,
        });
      } else {
        alert(response.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };
  editUserFromReact = async (data) => {
    try {
      let response = await editUser(data);
      if (response && response.errCode === 0) {
        await this.getAllUsersFromReact();
        this.setState({
          isOpenEditUserModal: false,
        });
      } else {
        alert(response.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleOnClickAddNewUser = () => {
    this.setState({
      isOpenUserModal: true,
    });
  };
  handleOnClickDeleteUser = async (data) => {
    try {
      let response = await deleteUser(data.id);
      if (response && response.errCode === 0) {
        this.getAllUsersFromReact();
      } else {
        alert(response.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleOnclickEditUser = (data) => {
    this.setState({
      isOpenEditUserModal: true,
      oldDataToEdit: data,
    });
  };
  toggleFromClassParent(data) {
    if (data === "add") {
      this.setState({
        isOpenUserModal: !this.state.isOpenUserModal,
      });
    }
    if (data === "edit") {
      this.setState({
        isOpenEditUserModal: !this.state.isOpenEditUserModal,
      });
    }
  }
  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className="users-container">
        <UserModal
          isOpenUserModal={this.state.isOpenUserModal}
          toggleFromClassParent={this.toggleFromClassParent.bind(this)}
          createNewUserFromReact={this.createNewUserFromReact}
        />
        {this.state.isOpenEditUserModal && (
          <EditUserModal
            isOpenEditUserModal={this.state.isOpenEditUserModal}
            toggleFromClassParent={this.toggleFromClassParent.bind(this)}
            editUserFromReact={this.editUserFromReact}
            oldDataToEdit={this.state.oldDataToEdit}
          />
        )}

        <div className="title text-center">Manage User with yasuo</div>
        <div className="mx-2">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleOnClickAddNewUser()}
          >
            <i className="fas fa-user-plus px-2"></i>Add New User
          </button>
        </div>
        <div className="users-table mx-2 mt-3">
          <table id="customers">
            <tbody>
              <tr>
                <th>EMAIL</th>
                <th>FIRST NAME</th>
                <th>LAST NAME</th>
                <th>ADDRESS</th>
                <th>ACTIONS</th>
              </tr>
              {arrUsers.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => this.handleOnclickEditUser(item)}
                      >
                        <i className="fas fa-user-edit"></i>
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => {
                          this.handleOnClickDeleteUser(item);
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
