import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";
import CustomScrollbars from "../components/CustomScrollbars";
import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";
import DetailDoctor from "./HomePage/DetailDoctor/DetailDoctor";
import DetailSpecialty from "./HomePage/DetailSpecialty/DetailSpecialty";
import DetailMedicalFacility from "./HomePage/DetailMedicalFacility/DetailMedicalFacility";
import DetailHandbook from "./HomePage/DetailHandbook/DetailHandbook";
import { path } from "../utils";
import Home from "../routes/System/Home";
import Login from "./Authentication/Login";
import Admin from "../routes/System/Admin";
import Doctor from "../routes/System/Doctor";
import { CustomToastCloseButton } from "../components/CustomToast";
import HomePage from "./HomePage/HomePage.jsx";
import VerifyBookingSchedule from "./HomePage/DetailDoctor/VerifyBookingSchedule";
class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    return (
      <Fragment>
        <Router history={history}>
          <div className="main-container">
            <div className="content-container">
              <CustomScrollbars style={{ width: "100%", height: "100vh" }}>
                <Switch>
                  <Route path={path.HOME} exact>
                    <Home />
                  </Route>
                  <Route path={path.HOMEPAGE} component={HomePage} />
                  <Route
                    path={path.LOGIN}
                    // component={userIsNotAuthenticated(Login)}
                    component={Login}
                  />
                  <Route
                    path={path.ADMIN}
                    // component={userIsAuthenticated(Admin)}
                    component={Admin}
                  />
                  <Route
                    path={path.DOCTOR}
                    // component={userIsAuthenticated(Doctor)}
                    component={Doctor}
                  />
                  <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                  <Route
                    path={path.VERIFY_BOOKING_SCHEDULE}
                    component={VerifyBookingSchedule}
                  />
                  <Route
                    path={path.DETAIL_SPECIALTY}
                    component={DetailSpecialty}
                  />
                  <Route
                    path={path.DETAIL_MEDICAL_FACILITY}
                    component={DetailMedicalFacility}
                  />
                  <Route
                    path={path.DETAIL_HANDBOOK}
                    component={DetailHandbook}
                  />
                </Switch>
              </CustomScrollbars>
            </div>

            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              theme="dark"
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
