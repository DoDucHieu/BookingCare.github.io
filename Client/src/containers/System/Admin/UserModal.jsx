import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
class UserModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
            phoneNumber: "",
            gender: 0,
            roleId: 0,
        };
    }

    componentDidMount() {}
    toggle() {
        this.props.toggleFromClassParent("add");
    }
    handleOnChangeInput = (event, id) => {
        let stateCopy = this.state;
        stateCopy[id] = event.target.value;
        // this.setState(
        //     (state) => ({
        //         ...state,
        //         [id]: event.target.value,
        //     }),
        //     () => {
        //         console.log(this.state);
        //     }
        // );
        this.setState({
            ...stateCopy,
        });
    };
    checkValidate() {
        let arr = [
            "email",
            "password",
            "firstName",
            "lastName",
            "address",
            "phoneNumber",
            "gender",
            "roleId",
        ];
        for (let i = 0; i < arr.length; i++) {
            let x = this.state[arr[i]];
            if (x === "") {
                return false;
            }
        }
        return true;
    }
    handleAddNewUser = async () => {
        let check = this.checkValidate();
        if (!check) {
            alert("Missing parameter!");
        } else {
            await this.props.createNewUserFromReact(this.state);
            this.setState({
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                address: "",
                phoneNumber: "",
                gender: 0,
                roleId: 0,
            });
        }
    };
    render() {
        return (
            <Modal
                isOpen={this.props.isOpenUserModal}
                toggle={() => this.toggle()}
                size="lg"
                className="userModal-scss"
            >
                <ModalHeader toggle={() => this.toggle()}>
                    Create A New User
                </ModalHeader>
                <ModalBody>
                    <div className="container">
                        <div className="container-row">
                            <div className="container-input">
                                <label>Email</label>
                                <input
                                    type="text"
                                    name="email"
                                    value={this.state.email}
                                    onChange={(event) =>
                                        this.handleOnChangeInput(event, "email")
                                    }
                                />
                            </div>
                            <div className="container-input">
                                <label>Password</label>
                                <input
                                    type="password"
                                    value={this.state.password}
                                    onChange={(event) =>
                                        this.handleOnChangeInput(
                                            event,
                                            "password"
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <div className="container-row">
                            <div className="container-input">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    value={this.state.firstName}
                                    onChange={(event) =>
                                        this.handleOnChangeInput(
                                            event,
                                            "firstName"
                                        )
                                    }
                                />
                            </div>
                            <div className="container-input">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    value={this.state.lastName}
                                    onChange={(event) =>
                                        this.handleOnChangeInput(
                                            event,
                                            "lastName"
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <div className="container-row">
                            <div className="container-input-address">
                                <label>Address</label>
                                <input
                                    type="text"
                                    value={this.state.address}
                                    onChange={(event) =>
                                        this.handleOnChangeInput(
                                            event,
                                            "address"
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <div className="container-row">
                            <div className="container-input-phoneNumber">
                                <label>Phone Number</label>
                                <input
                                    type="text"
                                    value={this.state.phoneNumber}
                                    onChange={(event) =>
                                        this.handleOnChangeInput(
                                            event,
                                            "phoneNumber"
                                        )
                                    }
                                />
                            </div>
                            <div className="container-input-select">
                                <div className="container-input-select-genderAndRole">
                                    <label>Gender</label>
                                    <select
                                        name=""
                                        value={this.state.gender}
                                        onChange={(event) =>
                                            this.handleOnChangeInput(
                                                event,
                                                "gender"
                                            )
                                        }
                                    >
                                        <option value="0">Male</option>
                                        <option value="1">Female</option>
                                    </select>
                                </div>
                                <div className="container-input-select-genderAndRole">
                                    <label>Role</label>
                                    <select
                                        name=""
                                        value={this.state.roleId}
                                        onChange={(event) =>
                                            this.handleOnChangeInput(
                                                event,
                                                "roleId"
                                            )
                                        }
                                    >
                                        <option value="0">Admin</option>
                                        <option value="1">Doctor</option>
                                        <option value="2">Patient</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => this.handleAddNewUser()}
                        className="px-3"
                    >
                        Add New
                    </Button>
                    <Button onClick={() => this.toggle()} className="px-3">
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserModal);
