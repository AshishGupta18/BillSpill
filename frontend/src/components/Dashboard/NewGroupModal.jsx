import React, { useState } from 'react';

const NewGroupModal = ({ isOpen, onClose, onGroupSubmit }) => {
    const [groupName, setGroupName] = useState('');
    const [inviteLink, setInviteLink] = useState('');
    const [members, setMembers] = useState(['']);
    
    // Function to generate a mock invite link when the modal opens
    const generateInviteLink = () => {
        const link = `https://billsplit.com/invite/${Math.random().toString(36).substring(2, 8)}`;
        setInviteLink(link);
    };
    
    // Adding more input fields to add members
    const handleAddMember = () => {
        setMembers([...members, '']);
    };

    const handleMemberChange = (index, value) => {
        const newMembers = [...members];
        newMembers[index] = value;
        setMembers(newMembers);
    };

    // Submit the new group data
    const handleSubmit = (e) => {
        e.preventDefault();
        if (groupName && members.length > 0) {
            onGroupSubmit({
                id: Math.random().toString(36).substring(7),  // Generate random group id
                name: groupName,
                members: members,
                inviteLink: inviteLink
            });
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Create New Group</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Group Name</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Invite Link</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={inviteLink}
                            readOnly
                        />
                        <button
                            type="button"
                            className="text-teal-600 underline mt-2"
                            onClick={generateInviteLink}
                        >
                            Generate Invite Link
                        </button>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Add Members Manually</label>
                        {members.map((member, index) => (
                            <input
                                key={index}
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md mt-2"
                                value={member}
                                onChange={(e) => handleMemberChange(index, e.target.value)}
                                placeholder={`Member ${index + 1}`}
                            />
                        ))}
                        <button
                            type="button"
                            className="text-teal-600 underline mt-2"
                            onClick={handleAddMember}
                        >
                            + Add another member
                        </button>
                    </div>

                    <div className="flex justify-end mt-6">
                        <button
                            type="button"
                            className="mr-2 px-4 py-2 text-gray-700 bg-gray-200 rounded-md"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 text-white bg-teal-600 rounded-md">
                            Create Group
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewGroupModal;