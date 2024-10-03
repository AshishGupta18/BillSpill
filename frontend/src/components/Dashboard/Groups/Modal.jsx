import React, { Component } from "react";
import { connect } from "react-redux";
import ExpenseBackendAPIService from "../../../services/ExpenseBackendAPIService";
import { toast } from "react-toastify";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

class Modal extends Component {
  state = {
    groupId: this.props.groupId,
    description: '',
    amount: '',
    date: ''
  };

  componentDidMount() {
    const options = {
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: true,
      startingTop: "4%",
      endingTop: "10%"
    };
    M.Modal.init(this.Modal, options);
  }

  setValues = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  // divide expense equally among all the members of the group
  addExpense = () => {
    ExpenseBackendAPIService.createExpense({
      groupId: this.state.groupId,
      amount: this.state.amount,
      description: this.state.description
    }).then(({ data, success }) => {
      if (success) {
        toast.success(`Successfully added expense of amount ${this.state.amount}`);
        this.props.addExpense({
          groupId: this.state.groupId,
          description: this.state.description,
          amount: this.state.amount
        });
        // Close the modal after saving
        const modalInstance = M.Modal.getInstance(this.Modal);
        modalInstance.close();
      } else {
        toast.error("Failed to add expense.");
      }
    });
  };

  render() {
    return (
      <div>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded modal-trigger"
          data-target="modal1"
        >
          Add an expense
        </button>

        <div
          ref={(Modal) => { this.Modal = Modal; }}
          id="modal1"
          className="modal"
        >
          <div className="modal-content p-6 bg-white rounded-lg">
            <h5 className="text-center text-orange-600 text-lg font-semibold mb-4">
              Add new expense to the group
            </h5>
            <div className="mb-4">
              <input
                placeholder="Expense item name"
                id="description"
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md mb-3"
                onChange={this.setValues}
              />
              <input
                placeholder="Cost of item"
                id="amount"
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md"
                onChange={this.setValues}
              />
            </div>
          </div>
          <div className="modal-footer flex justify-center mb-4">
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded"
              onClick={this.addExpense}
            >
              Save
            </button>
            <button
              className="ml-4 bg-gray-300 hover:bg-gray-400 text-black py-2 px-6 rounded modal-close"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addExpense: (state) => {
      dispatch({
        type: "ADD_NEW_EXPENSE",
        payload: state
      });
    }
  };
};

export default connect(null, mapDispatchToProps)(Modal);