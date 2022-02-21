import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../../containers/System/Admin/UserManage";
import UserRedux from "../../containers/System/Admin/UserRedux";
import DoctorManage from "../../containers/System/Admin/DoctorManage";
import SpecialtyManage from "../../containers/System/Admin/SpecialtyManage";
import Header from "../../containers/System/SystemHeader/Header";

class Admin extends Component {
  render() {
    const { systemMenuPath, isLoggedIn } = this.props;
    return (
      <>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route path="/admin/user-manage" component={UserManage} />
              <Route path="/admin/user-redux" component={UserRedux} />
              <Route path="/admin/manage-doctors" component={DoctorManage} />
              <Route path="/admin/specialty" component={SpecialtyManage} />
              {/* <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              /> */}
            </Switch>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
