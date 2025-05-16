import { Request, Response, RequestHandler } from "express"
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";

export const register: RequestHandler = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      res.status(400).json({ message: "Email already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const token = generateToken(newUser._id.toString());
    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

export const login: RequestHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid Credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid Credentials" });
      return;
    }

    const token = generateToken(user._id.toString());
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}