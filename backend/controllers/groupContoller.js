const Group = require('../models/Group');

const createGroup = async (req, res) => {
  const { name } = req.body;

  try {
    const newGroup = await Group.create({ name, members: [req.user._id] });
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Additional group management functions (add expense, view balances, etc.) can be added here

module.exports = { createGroup };