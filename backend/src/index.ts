import dotenv from "dotenv";
import express from "express";
import cors from "cors"
import { connectDB } from "./config/db";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";
import expenseRouter from "./routes/expense.route";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);

app.use('/api/user', userRouter);

app.use('/api/expenses', expenseRouter)

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  })
})