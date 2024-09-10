import { db } from "../config/index.js";
import { createToken } from "../middlewares/Auth.js";
import { hash, compare } from "bcrypt";

export class Users {
  // Get all users
  async getAllUsers() {
    const queryString = "SELECT * FROM Users";
    try {
      const [rows] = await db.execute(queryString);
      if (rows.length === 0) {
        return { success: false, message: "No users found" };
      }
      return { success: true, result: rows };
    } catch (err) {
      console.error("Error getting all users:", err);
      return { success: false, message: "Internal server error" };
    }
  }

  // Get a user by ID along with their posts
  async getUserById(id) {
    const queryString = `
      SELECT 
          U.user_id, U.username, U.email, U.user_role,
          P.post_id, P.title, P.content
      FROM 
          Users U
      LEFT JOIN 
          Posts P 
      ON 
          U.user_id = P.user_id
      WHERE 
          U.user_id = ?`;

    try {
      const [rows] = await db.execute(queryString, [id]);

      if (rows.length === 0) {
        return { success: false, message: "User not found" };
      }

      // Extract user info from the first row
      const user = {
        user_id: rows[0].user_id,
        username: rows[0].username,
        email: rows[0].email,
        user_role: rows[0].user_role,
        posts: [],
      };

      // Extract posts if they exist
      if (rows[0].post_id !== null) {
        user.posts = rows.map(row => ({
          post_id: row.post_id,
          title: row.title,
          content: row.content,
        }));
      }

      return { success: true, result: user };
    } catch (err) {
      console.error("Error getting user by ID:", err);
      return { success: false, message: "Internal server error" };
    }
  }

  // Create a new user
  async createUser(user) {
    const queryString =
      "INSERT INTO Users (username, email, user_role, password_hash) VALUES (?, ?, ?, ?)";
    try {
      const hashedPassword = await hash(user.password, 10);
      const values = [
        user.username,
        user.email,
        user.role || "user",
        hashedPassword,
      ];
      const [result] = await db.execute(queryString, values);

      if (result.affectedRows === 0) {
        return { success: false, message: "No user found" };
      }

      const token = createToken({
        email: user.email,
        role: user.role || "user",
        id: result.insertId,
      });
      return { success: true, result: { id: result.insertId, token } };
    } catch (err) {
      console.error("Error creating user:", err);
      return { success: false, message: err.message };
    }
  }

  // User login
  async loginUser(email, password) {
    const queryString = "SELECT * FROM Users WHERE email = ?";
    try {
      const [rows] = await db.execute(queryString, [email]);
      if (rows.length === 0) {
        return { success: false, message: "User not found" };
      }

      const user = rows[0];
      const isPasswordValid = await compare(password, user.password_hash);
      if (!isPasswordValid) {
        return { success: false, message: "Invalid password" };
      }

      const token = createToken({
        email: user.email,
        role: user.user_role,
        id: user.user_id,
      });
      return { success: true, id: user.user_id, token };
    } catch (err) {
      console.error("Error logging in:", err);
      return { success: false, message: err.message };
    }
  }

  // Delete a user by ID
  async deleteUser(id) {
    const queryString = "DELETE FROM Users WHERE user_id = ?";
    try {
      const [result] = await db.execute(queryString, [id]);
      if (result.affectedRows === 0) {
        return { success: false, message: "User not found" };
      }
      return { success: true, message: "User deleted successfully" };
    } catch (err) {
      console.error("Error deleting user:", err);
      return { success: false, message: "Internal server error" };
    }
  }

  // Update user details
  async updateUser(id, { username, email, password }) {
    let queryString =
      "UPDATE Users SET username = ?, email = ? WHERE user_id = ?";
    let values = [username, email, id];

    // If password is provided, update it
    if (password) {
      const hashedPassword = await hash(password, 10);
      queryString =
        "UPDATE Users SET username = ?, email = ?, password_hash = ? WHERE user_id = ?";
      values = [username, email, hashedPassword, id];
    }

    try {
      const [result] = await db.execute(queryString, values);
      if (result.affectedRows === 0) {
        return { success: false, message: "User not found" };
      }
      return { success: true, message: "User updated successfully" };
    } catch (err) {
      console.error("Error updating user:", err);
      return { success: false, message: "Internal server error" };
    }
  }
}