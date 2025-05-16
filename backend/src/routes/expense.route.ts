import { Router } from "express";
import { AuthenticatedRequest, verifyToken } from "../middleware/auth.middleware";
import Expense from "../models/expense.model";

const expenseRouter = Router();

// Get all expenses
expenseRouter.get('/', verifyToken, async (req: AuthenticatedRequest, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id}).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Error getting expenses' });
  }
});

// Post new expense
expenseRouter.post('/', verifyToken, async (req: AuthenticatedRequest, res) => {
  try {
    const { title, amount, category, date, currency, notes } = req.body;

    const newExpense = new Expense({
      userId: req.user.id,
      title,
      amount,
      category,
      date,
      currency,
      notes
    });
    
    const saved = await newExpense.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Error creating expense' });
  }
});

// Delete expense by id
expenseRouter.delete('/:id', verifyToken, async (req: AuthenticatedRequest, res) => {
  try {
    const deleted = await Expense.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!deleted) {
      res.status(404).json({ message: 'Expense not found' });
      return;
    }
    res.status(200).json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting expense' });
  }
});

// Update expense by id
expenseRouter.put('/:id', verifyToken, async (req: AuthenticatedRequest, res) => {
  try {
    const { title, amount, category, date, currency, notes } = req.body;
    
    const updated = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { title, amount, category, date, currency, notes },
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ message: 'Expense not found' });
      return;
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating expense' });
  }
});

export default expenseRouter;