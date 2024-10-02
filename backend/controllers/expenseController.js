import Expense from '../models/Expense.js';
import Group from '../models/Group.js';

// Add Expense
export const addExpense = async (req, res) => {
  const { description, amount, paidBy, splitAmong, groupId } = req.body;

  try {
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: 'Group not found' });

    const expense = new Expense({ description, amount, paidBy, splitAmong, group: groupId });
    await expense.save();

    group.expenses.push(expense._id);
    await group.save();

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Expenses for a Group
export const getExpenses = async (req, res) => {
  const groupId = req.params.groupId;

  try {
    const expenses = await Expense.find({ group: groupId }).populate('paidBy splitAmong', 'name email');
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};