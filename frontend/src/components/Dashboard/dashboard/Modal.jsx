import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import ExpenseBackendAPIService from "../../../services/ExpenseBackendAPIService";

const API_ENDPOINT = process.env.REACT_APP_ENDPOINT;

class Modal extends Component {
    state = {
        userId: this.props.userInfo.id,
        completeUserList: [],
        selectedPerson: '',
    }

    componentDidMount() {
        // getting all the users
        const token = JSON.parse(localStorage.getItem('token'));
        axios.get(`${API_ENDPOINT}/user/all`, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        }).then(res => {
            if (res.data.success) {
                this.setState({
                    completeUserList: res.data.data.map(user => ({
                        label: user.name,
                        id: user.id,
                        email: user.email,
                        isAdded: this.props.userInfo.id === user.id,
                    })),
                });
            } else {
                toast.error(res.data.reason);
            }
        });
    }

    setUserName = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    onSelectPersonHandler = (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        if (selectedOption.id) {
            this.setState({
                selectedPerson: {
                    name: selectedOption.getAttribute('name'),
                    id: selectedOption.value,
                    email: selectedOption.id
                }
            });
        }
    }

    addAPersonToGroup = () => {
        ExpenseBackendAPIService.settleExpenseWithUser2ID({
            user: this.state.userId,
            params: this.state.selectedPerson.id
        }).then(({ data, success }) => {
            if (success) {
                console.log('settled expense : ', data);
            }
        });
    }

    render() {
        return (
            <div>
                {/* Modal Trigger Button */}
                <label htmlFor="modal1" className="btn orange darken-3 modal-trigger">Settle</label>

                {/* Modal Structure */}
                <div id="modal1" className="modal">
                    <div className="modal-content">
                        <h5 className="text-center text-orange-700">Settle Balance</h5>
                        <div className="mt-4">
                            <select
                                value={this.state.selectedPerson ? this.state.selectedPerson.id : ""}
                                onChange={this.onSelectPersonHandler}
                                className="block w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="">Select a person</option>
                                {
                                    this.state.completeUserList.filter(user => !user.isAdded).map(user => (
                                        <option
                                            key={user.id}
                                            value={user.id}
                                            id={user.email}
                                            name={user.label}
                                        >
                                            {user.label.toUpperCase()} ({user.email})
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            className="btn orange darken-3 w-full py-2 mt-4"
                            onClick={this.addAPersonToGroup}
                            disabled={!this.state.selectedPerson}
                        >
                            Settle Balance
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteUser: (state) => {
            dispatch({
                type: "DELETE_USER",
                payload: state
            });
        }
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.userState.user,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);