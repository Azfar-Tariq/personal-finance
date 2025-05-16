import mongoose, { Document, Schema } from "mongoose";

export interface IExpense extends Document {
  userId: string;
  title: string;
  amount: number;
  category: string;
  date: Date;
  currency: string;
  notes?: string;
}

const ExpenseSchema = new Schema<IExpense>(
  {
    userId: {
      type: String,
      required: true,
      ref: 'User'
    },
    title: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    currency: {
      type: String,
      required: true,
      default: 'Rs'
    },
    date: {
      type: Date,
      required: true
    },
    notes: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Expense = mongoose.model<IExpense>('Expense', ExpenseSchema);
export default Expense;