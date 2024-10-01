const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  expenses: [
    {
      description: String,
      amount: Number,
      paidBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      split: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, amount: Number }],
    },
  ],
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;