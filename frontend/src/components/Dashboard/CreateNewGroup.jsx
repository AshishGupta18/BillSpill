import React, { Component } from "react";
import { connect } from "react-redux";
import letter from "../../letter.webp";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { withRouter } from "react-router-dom";
import GroupBackendAPIService from "../../services/GroupBackendAPIService";

const API_ENDPOINT = process.env.REACT_APP_ENDPOINT;

class CreateNewGroup extends Component {
	state = {
		name: "",
		userIds: [],
		completeUserList: [],
		selectedPerson: '',
		userIdToNameMap: {},
	};

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	componentDidMount() {
		const token = JSON.parse(localStorage.getItem('token'));
		axios.get(`${API_ENDPOINT}/user/all`, {
			headers: {
				authorization: `Bearer ${token}`,
			}
		}).then(res => {
			if (res.data.success) {
				this.setState({
					...this.state,
					completeUserList: res.data.data.map(user => ({
						label: user.name,
						id: user.id,
						email: user.email,
						isAdded: this.props.userInfo.id === user.id,
					}))
				});
			} else {
				toast.error(res.data.reason);
			}
		});
	}

	createNewGroup = (e) => {
		e.preventDefault();
		if (this.state.name === '') {
			toast.error("Please add a name to your group");
		} else {
			GroupBackendAPIService.createGroup({
				name: this.state.name,
				invitedUsers: this.state.userIds.map(user => user.id)
			}).then(({ data, success }) => {
				if (success) {
					toast.success(`Group "${this.state.name}" has been created successfully!`);
					this.props.addActiveGroup([{
						id: data.id,
						name: data.name,
					}]);
					this.props.history.push('/user/home/invites');
				} else {
					toast.error(data.reason);
				}
			});
		}
	};

	onSelectPersonHandler = (e) => {
		const selectedOption = e.target.options[e.target.selectedIndex];
		if (selectedOption.id) {
			this.setState({
				...this.state,
				selectedPerson: {
					name: selectedOption.getAttribute('name'),
					id: selectedOption.value,
					email: selectedOption.id
				}
			});
		}
	};

	addAPersonToGroup = () => {
		this.setState((prevState) => ({
			...prevState,
			userIds: [...prevState.userIds, prevState.selectedPerson],
			selectedPerson: '',
			completeUserList: prevState.completeUserList.map(user => ({
				...user,
				isAdded: [prevState.selectedPerson.id, this.props.userInfo.id].includes(user.id),
			}))
		}));
	};

	render() {
		return (
			<div className="container mx-auto flex flex-col md:flex-row p-6">
				{/* Left side: Group Image */}
				<div className="md:w-1/3 text-center mb-6 md:mb-0">
					<img className="w-48 h-48 mx-auto" src={letter} alt="letter" />
					<div className="mt-4">
						<p className="text-gray-700">Change Group Image</p>
						<input className="mt-2" type="file" />
					</div>
				</div>

				{/* Right side: Group form */}
				<div className="md:w-2/3">
					<h5 className="text-gray-700 text-xl mb-4">Start a new group</h5>
					<div className="mb-4">
						<input
							id="name"
							type="text"
							className="w-full border border-gray-300 p-2 rounded-md"
							placeholder="My group shall be called"
							onChange={this.handleChange}
							required
						/>
					</div>

					{/* Group Members */}
					<div className="mb-4">
						<p className="text-gray-600 mb-2">Group members</p>
						<div className="flex items-center space-x-2 mb-2">
							<img className="w-8 h-8" src="https://img.icons8.com/nolan/64/user-male-circle.png" alt="user" />
							<span>{this.props.userInfo.name} ({this.props.userInfo.email})</span>
						</div>
						{this.state.userIds.length > 0 && this.state.userIds.map((user) => (
							<div key={user.id} className="flex items-center space-x-2 mb-2">
								<img className="w-8 h-8" src="https://img.icons8.com/nolan/64/user-male-circle.png" alt="user" />
								<span>{user.name} ({user.email})</span>
							</div>
						))}
					</div>

					{/* Add Person */}
					<div className="mb-6">
						<select
							value={this.state.selectedPerson ? this.state.selectedPerson.id : null}
							onChange={this.onSelectPersonHandler}
							className="w-full border border-gray-300 p-2 rounded-md"
						>
							<option>Select a person</option>
							{this.state.completeUserList.filter(user => !user.isAdded).map(user => (
								<option key={user.id} value={user.id} id={user.email} name={user.label}>
									{user.label.toUpperCase()} ({user.email})
								</option>
							))}
						</select>
						<button
							className="mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md w-full"
							onClick={this.addAPersonToGroup}
							disabled={!this.state.selectedPerson}
						>
							Add a person
						</button>
					</div>

					{/* Create Group */}
					<button
						className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md w-full"
						onClick={this.createNewGroup}
						disabled={!this.state.name || !this.state.userIds.length}
					>
						Create Group
					</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userInfo: state.userState.user,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addActiveGroup: (state) => {
			dispatch({
				type: 'ADD_ACTIVE_GROUPS',
				payload: state
			});
		}
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateNewGroup));