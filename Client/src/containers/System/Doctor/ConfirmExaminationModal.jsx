import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import "./ConfirmExaminationModal.scss";
import { CommonUtils, manageActions, LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import Select from "react-select";
import moment from "moment";
import { dateFormat } from "../../../utils";
import { Modal } from "reactstrap";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

class ConfirmExaminationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailPatient: this.props.emailFromManagePatient,
      previewImg: "",
      avatar: "",
      isOpenImg: false,
    };
  }

  componentDidMount = async () => {};
  componentDidUpdate(prevProps, prevState, snapShot) {}
  handleChangeEmailPatient = (event) => {
    this.setState({
      emailPatient: event.target.value,
    });
  };
  handleOnchangeImg = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.toBase64(file);
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
      isOpenImg: true,
    });
  };

  render() {
    console.log("child: ", this.state);
    return (
      <>
        <Modal
          isOpen={this.props.isOpenModal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <div className="confirm_examination-modal">
            <div className="modal_header">
              <span className="modal_header-title">Confirm examination</span>
              <i
                className="fas fa-times"
                onClick={() =>
                  this.props.handleShowHideModal("", "childCloseModal")
                }
              ></i>
            </div>
            <div className="modal_body">
              <div className=" form-group email_patient">
                <label>Email patient:</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.emailPatient ? this.state.emailPatient : ""}
                  onChange={(event) => this.handleChangeEmailPatient(event)}
                />
              </div>
              <div className="row mt-3 ">
                <div className="form-group col-6">
                  <label>
                    <FormattedMessage id={"manage-specialty.select-img"} />
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
                      <FormattedMessage id={"manage-specialty.upload-img"} />
                    </label>
                  </div>
                </div>
                <div
                  className="mt-2 previewImg"
                  onClick={() => this.handleOpenPreviewImg()}
                >
                  {this.state.previewImg && (
                    <img src={this.state.previewImg}></img>
                  )}
                </div>
                {this.state.isOpenImg && (
                  <Lightbox
                    className="light_box"
                    mainSrc={this.state.previewImg}
                    onCloseRequest={() => this.setState({ isOpenImg: false })}
                  />
                )}
              </div>
            </div>
            <div className="modal_footer">
              <div className="footer_btn">
                <button
                  className="btn btn-primary confirm_save"
                  onClick={() =>
                    this.props.handleShowHideModal(
                      {
                        email: this.state.emailPatient
                          ? this.state.emailPatient
                          : "",
                        billImg: this.state.avatar ? this.state.avatar : "",
                      },
                      "child"
                    )
                  }
                >
                  {this.props.language === LANGUAGES.VI ? "Lưu" : "Save"}
                </button>
                <button
                  className="btn btn-dark confirm_cancel"
                  onClick={() =>
                    this.props.handleShowHideModal("", "childCloseModal")
                  }
                >
                  {this.props.language === LANGUAGES.VI ? "Hủy" : "Cancel"}
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    doctorId: state.user.userInfo.id,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmExaminationModal);
