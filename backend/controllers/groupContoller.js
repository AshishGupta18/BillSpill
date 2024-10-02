import Group from '../models/Group.js';
import User from '../models/User.js';

// Create Group
export const createGroup = async (req, res) => {
  const { name, memberEmails } = req.body;

  try {
    const members = await User.find({ email: { $in: memberEmails } });
    const group = new Group({ name, members });
    await group.save();

    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Groups
export const getGroups = async (req, res) => {
  const userId = req.user.id;

  try {
    const groups = await Group.find({ members: userId }).populate('members', 'name email');
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};