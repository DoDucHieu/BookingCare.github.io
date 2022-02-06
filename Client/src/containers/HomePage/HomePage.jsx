import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader/HomeHeader";
import Specialty from "./Section/Specialty";
import MedicalFacility from "./Section/MedicalFacility";
import OutstandingDoctor from "./Section/OutstandingDoctor";
import HandBook from "./Section/HandBook";
import AboutBookingCare from "./Section/AboutBookingCare";
import HomeFooter from "./HomeFooter/HomeFooter";

class HomePage extends Component {
  render() {
    return (
      <div className="home">
        <HomeHeader />
        <Specialty />
        <MedicalFacility />
        <OutstandingDoctor />
        <HandBook />
        <AboutBookingCare />
        <HomeFooter />
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
