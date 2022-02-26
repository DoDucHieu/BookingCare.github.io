import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import Header from "../../containers/System/SystemHeader/Header";
import ManageSchedule from "../../containers/System/Doctor/ManageSchedule";
import ManagePatient from "../../containers/System/Doctor/ManagePatient";
import { ROLE } from "../../utils";

class Doctor extends Component {
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
    if (prevProps.userInfo !== this.props.userInfo) {
      this.setState({
        userInfo: this.props.userInfo,
        isLoggedIn: this.props.isLoggedIn,
      });
    }
  }
  render() {
    const { isLoggedIn } = this.state;
    let userRole = this.state.userInfo ? this.state.userInfo.roleId : "";
    return (
      <>
        {isLoggedIn && <Header />}
        <div className="doctor-container">
          <div className="doctor-list">
            <Switch>
              <Route
                path="/doctor/manage-schedule"
                component={ManageSchedule}
              />
              {userRole && userRole === ROLE.DOCTOR && (
                <Route
                  path="/doctor/manage-patient"
                  component={ManagePatient}
                />
              )}
            </Switch>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("map");
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctor));
