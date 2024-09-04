import { Router } from "express";
import { verifyAToken, roleAuth } from "../middlewares/Auth.js";
import { Users } from "../models/Users.js";

const userRouter = Router();
const user = new Users();

// Public routes
userRouter.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const result = await user.createUser({ username, email, password, role });
  if (result.success) {
    res.status(201).json(result.result);
  } else {
    res.status(500).json({ message: result.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const result = await user.loginUser(email, password);
  if (result.success) {
    res.status(200).json({ id: result.id, token: result.token });
  } else {
    res.status(500).json({ message: result.message });
  }
});

// Protected routes
userRouter.use(verifyAToken);

userRouter.get("/all", roleAuth(["admin", "user"]), async (req, res) => {
  const result = await user.getAllUsers();
  if (result.success) {
    res.status(200).json(result.result);
  } else {
    res.status(500).json({ message: result.message });
  }
});

userRouter.get("/:id", roleAuth(["admin", "user"]), async (req, res) => {
  const { id } = req.params;
  const result = await user.getUserById(id);
  if (result.success) {
    res.status(200).json(result.result);
  } else {
    res.status(404).json({ message: result.message });
  }
});

userRouter.patch("/update/:id", roleAuth(["admin", "user"]), async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;
  const result = await user.updateUser(id, { username, email, password });
  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    res.status(500).json({ message: result.message });
  }
});

userRouter.delete("/delete/:id", roleAuth(["admin", "user"]), async (req, res) => {
  const { id } = req.params;
  const result = await user.deleteUser(id);
  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    res.status(500).json({ message: result.message });
  }
});

// Error handling
userRouter.use((err, req, res, next) => {
  console.error('Unexpected error:', err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

export default userRouter;
