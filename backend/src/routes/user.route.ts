import { Router } from "express";
import { AuthenticatedRequest, verifyToken } from "../middleware/auth.middleware";

const userRouter = Router();

userRouter.get('/me', verifyToken, (req: AuthenticatedRequest, res) => {
  res.json({
    message: 'User authenticated',
    user: req.user
  });
});

export default userRouter;