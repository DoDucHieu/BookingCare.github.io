import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import UserManage from "../../containers/System/Admin/UserManage";
import UserRedux from "../../containers/System/Admin/UserRedux";
import DoctorManage from "../../containers/System/Admin/DoctorManage";
import SpecialtyManage from "../../containers/System/Admin/SpecialtyManage";
import ClinicManage from "../../containers/System/Admin/ClinicManage";
import HandbookManage from "../../containers/System/Admin/HandbookManage";
import { LANGUAGES, ROLE } from "../../utils";

import Header from "../../containers/System/SystemHeader/Header";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: this.props.userInfo,
      isLoggedIn: this.props.isLoggedIn,
    };
  }
  componentDidMount() {
    this.setState({
      userInfo: this.props.userInfo,
      isLoggedIn: this.props.isLoggedIn,
    });
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    console.log("did update:", this.props.userInfo);
    if (prevProps.userInfo !== this.props.userInfo) {
      this.setState({
        userInfo: this.props.userInfo,
        isLoggedIn: this.props.isLoggedIn,
      });
      if (this.props.userInfo.roleId !== ROLE.ADMIN) {
        this.props.history.push("/login");
      }
    }
  }

  render() {
    const { isLoggedIn } = this.state;
    let userRole = this.state.userInfo ? this.state.userInfo.roleId : "";
    return (
      <>
        {isLoggedIn && <Header />}
        {userRole && userRole === ROLE.ADMIN ? (
          <div className="system-container">
            <div className="system-list">
              <Switch>
                <Route path="/admin/user-manage" component={UserManage} />
                <Route path="/admin/user-redux" component={UserRedux} />
                <Route path="/admin/manage-doctors" component={DoctorManage} />
                <Route path="/admin/specialty" component={SpecialtyManage} />
                <Route path="/admin/clinic" component={ClinicManage} />
                <Route path="/admin/handbook" component={HandbookManage} />
              </Switch>
            </div>
          </div>
        ) : (
          <div
            className="system-container"
            style={{
              color: "red",
              display: "flex",
              justifyContent: "center",
              marginTop: "32px",
            }}
          >
            <h4>
              {this.props.language === LANGUAGES.EN
                ? "Only admin has access to this feature!"
                : "Chỉ Admin mới có thể truy cập vào tính năng này!"}
            </h4>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Admin));
