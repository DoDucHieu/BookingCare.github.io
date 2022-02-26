import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, path } from "../../../utils";
import { withRouter } from "react-router";
import "./DetailHandbook.scss";
import * as actions from "../../../store/actions";
import HomeHeader from "../HomeHeader/HomeHeader";
import HomeFooter from "../HomeFooter/HomeFooter";
import Select from "react-select";
import { getHandbook } from "../../../services/userService";

class DetailHandbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailHandbook: {},
    };
  }

  componentDidMount = async () => {
    this.handleGetHandbook(this.props.match.params.handbookId);
  };

  componentDidUpdate(prevProps, prevState, snapShot) {}

  handleGetHandbook = async (handbookId) => {
    try {
      let result = await getHandbook(handbookId);
      if (result && result.errCode === 0) {
        this.setState({
          detailHandbook: result.data,
        });
        console.log("Get detail handbook success!");
      } else {
        console.log("Get detail handbook failed!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    console.log("check state from detail handbook: ", this.state);
    let { detailHandbook } = this.state;
    let contentHTML = detailHandbook ? detailHandbook.contentHTML : "";
    return (
      <>
        <HomeHeader isNotDisplayBanner={true} />
        <div
          className="detail_handbook"
          dangerouslySetInnerHTML={{ __html: contentHTML }}
        ></div>
        <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandbook);
