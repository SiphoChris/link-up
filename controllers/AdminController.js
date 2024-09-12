import { Router } from "express";
import { verifyAToken, roleAuth } from "../middlewares/Auth.js";
import { Admin } from "../models/Admin.js";

const adminRouter = Router();
const admin = new Admin();

// Public routes
adminRouter.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;

  // Ensure role is either 'admin' or 'user'
  if (role && role !== 'admin') {
    return res.status(400).json({ success: false, message: 'Invalid role specified' });
  }

  const result = role === 'admin'
    ? await admin.createAdmin({ username, email, password })
    : await admin.createUser({ username, email, password });

  res.status(result.success ? 201 : 400).json(result);
});

adminRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await admin.loginAdmin(email, password);
  res.status(result.success ? 200 : 401).json(result);
});

// Protected routes
// adminRouter.use(verifyAToken);
// adminRouter.use(roleAuth(['admin']));

// User CRUD operations
adminRouter.get("/users/all", async (req, res) => {
  const result = await admin.getUsers();
  res.status(result.success ? 200 : 500).json(result);
});

adminRouter.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const result = await admin.getUserById(id);
  res.status(result.success ? 200 : 404).json(result);
});

adminRouter.post("/users/add", async (req, res) => {
  const user = req.body;
  const result = await admin.createUser(user);
  res.status(result.success ? 201 : 400).json(result);
});

adminRouter.patch("/users/update/:id", async (req, res) => {
  const { id } = req.params;
  const user = req.body;
  const result = await admin.updateUser(id, user);
  res.status(result.success ? 200 : 404).json(result);
});

adminRouter.delete("/users/delete/:id", async (req, res) => {
  const { id } = req.params;
  const result = await admin.deleteUser(id);
  res.status(result.success ? 200 : 404).json(result);
});

// Post CRUD operations
adminRouter.get("/posts/all", async (req, res) => {
  const result = await admin.getPosts();
  res.status(result.success ? 200 : 500).json(result);
});

adminRouter.get("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const result = await admin.getPostById(id);
  res.status(result.success ? 200 : 404).json(result);
});

adminRouter.post("/posts/create", async (req, res) => {
  const post = req.body;
  const result = await admin.createPost(post);
  res.status(result.success ? 201 : 400).json(result);
});

adminRouter.patch("/posts/update/:id", async (req, res) => {
  const { id } = req.params;
  const post = req.body;
  const result = await admin.updatePost(id, post);
  res.status(result.success ? 200 : 404).json(result);
});

adminRouter.delete("/posts/delete/:id", async (req, res) => {
  const { id } = req.params;
  const result = await admin.deletePost(id);
  res.status(result.success ? 200 : 404).json(result);
});

// Error handling
adminRouter.use((err, req, res, next) => {
  console.error('Unexpected error:', err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

export default adminRouter;
