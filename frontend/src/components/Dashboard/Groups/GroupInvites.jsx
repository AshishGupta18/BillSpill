import React, { useState, useEffect } from 'react';
import { useSelector, connect } from 'react-redux';
import '../dashboard.css';
import axios from 'axios';
import { toast } from "react-toastify";
import GroupBackendAPIService from "../../../services/GroupBackendAPIService";
import SearchComponent from "./SearchComponent";

const Invites = (props) => {
  const [invitedGroups, setInvitedGroups] = useState(props.invitedGroups || []);
  const [acceptedGroups, setAcceptedGroups] = useState(props.acceptedGroups || []);

  useEffect(() => {
    GroupBackendAPIService.getAllGroups().then(({ data, success }) => {
      if (success) {
        props.addActiveGroups(data.acceptedGroups);
        props.addInvites(data.invitedGroups);
        
        setInvitedGroups(data.invitedGroups.map(group => ({
          ...group,
          show: true,
        })));
        
        setAcceptedGroups(data.acceptedGroups.map(group => ({
          ...group,
          show: true,
        })));
      } else {
        toast.error(data.reason);
      }
    }).catch(error => {
      toast.error("Error fetching groups.");
      console.error(error);
    });
  }, []);

  const acceptInvitation = (invite) => {
    GroupBackendAPIService.acceptInvitation(invite).then(({ data, success }) => {
      if (success) {
        toast.success(`Invite for ${invite.name} accepted successfully!`);
        props.acceptGroupInvite([invite]);
        setInvitedGroups(invitedGroups.filter(group => group.id !== invite.id));
        setAcceptedGroups([...acceptedGroups, invite]);
      } else {
        toast.error(data.message);
      }
    }).catch(error => {
      toast.error("Error accepting invitation.");
      console.error(error);
    });
  };

  const leaveGroup = (group, isInvitedGroup) => {
    GroupBackendAPIService.leaveGroup(group).then(({ data, success }) => {
      if (success) {
        toast.info(`Successfully left the group ${group.name}!`);
        if (isInvitedGroup) {
          props.removeInvites(group);
          setInvitedGroups(invitedGroups.filter(g => g.id !== group.id));
        } else {
          props.removeActiveGroups(group);
          setAcceptedGroups(acceptedGroups.filter(g => g.id !== group.id));
        }
      } else {
        toast.error(data.reason);
      }
    }).catch(error => {
      toast.error("Error leaving group.");
      console.error(error);
    });
  };

  const searchGroup = (searchString) => {
    const lowerCaseSearch = searchString.toLowerCase();
    setAcceptedGroups(acceptedGroups.map(group => ({
      ...group,
      show: group.name.toLowerCase().includes(lowerCaseSearch),
    })));
    setInvitedGroups(invitedGroups.map(group => ({
      ...group,
      show: group.name.toLowerCase().includes(lowerCaseSearch),
    })));
  };

  return (
    <div className="container user-groups">
      <div className="row">
        <div className="col m8 z-depth-1">
          <div className="header row valign-wrapper grey lighten-2">
            <div className="col m12 valign-wrapper">
              <span className="center-align">My Groups</span>
            </div>
          </div>
          
          <SearchComponent searchGroup={searchGroup} />
          
          <table className="centered highlight expenses-list-table">
            <tbody>
              {invitedGroups.filter(group => group.show).map(invite => (
                <tr className="left-align grey lighten-4" key={invite.id}>
                  <td className="grey-text text-darken-2">
                    <h6>{invite.name}</h6>
                  </td>
                  <td className="left-align">
                    <a
                      className="btn-floating waves-light green add"
                      onClick={() => acceptInvitation(invite)}
                    >
                      <i className="material-icons">add</i>
                    </a>
                    <span style={{ marginLeft: "10px" }} />
                    <a
                      className="btn-floating waves-light red delete"
                      onClick={() => leaveGroup(invite, true)}
                    >
                      <i className="material-icons">clear</i>
                    </a>
                  </td>
                </tr>
              ))}
              
              {acceptedGroups.filter(group => group.show).map(group => (
                <tr className="left-align" key={group.id}>
                  <td className="grey-text text-darken-2">
                    <h6>{group.name}</h6>
                  </td>
                  <td className="left-align">
                    <a
                      className="btn-floating waves-light red delete"
                      onClick={() => leaveGroup(group, false)}
                    >
                      <i className="material-icons">clear</i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  activeGroups: state.userState.activeGroups.map(group => ({
    ...group,
    show: true,
  })),
  invitedGroups: state.userState.invitedGroups.map(group => ({
    ...group,
    show: true,
  })),
});

const mapDispatchToProps = (dispatch) => ({
  addActiveGroups: (groups) => {
    dispatch({ type: 'ADD_ACTIVE_GROUPS', payload: groups });
  },
  acceptGroupInvite: (group) => {
    dispatch({ type: 'ACCEPT_GROUP_INVITE', payload: group });
  },
  addInvites: (groups) => {
    dispatch({ type: 'ADD_INVITES', payload: groups });
  },
  removeActiveGroups: (group) => {
    dispatch({ type: 'REMOVE_ACTIVE_GROUPS', payload: group });
  },
  removeInvites: (group) => {
    dispatch({ type: 'REMOVE_INVITES', payload: group });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Invites);