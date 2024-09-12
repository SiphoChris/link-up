import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { API_URL } from "../utils/index";
import VueCookies from "vue-cookies";

export const usersActions = {
  async fetchAllUsers({ commit }) {
    try {
      const { data } = await axios.get(`${API_URL}/api/users/all`);
      const { results } = data;
      if (results) {
        commit("setUsers", results);
      } else {
        toast.error("No users found", {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    } catch (e) {
      toast.error(`${e.message}`, {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  },

  async fetchUserAndPosts({ commit }, id) {
    try {
      const { data } = await axios.get(`${API_URL}/api/users/${id}/posts`);
      if (data) {
        commit("setUser", data);
      } else {
        toast.error("No user found", {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    } catch (e) {
      toast.error(`${e.message}`, {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  },

  async registerUser({ dispatch }, payload) {
    try {
      const { data } = await axios.post(`${API_URL}/api/users/register`, payload);
      const { msg, token, id } = data;
      if (msg) {
        VueCookies.set("token", token, "1h"); // Set token cookie
        VueCookies.set("user_id", id, "1h"); // Set user ID cookie
        dispatch("fetchAllUsers");
        toast.success(`${msg}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    } catch (e) {
      toast.error(`${e.message}`, {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  },

  async loginUser({ commit }, payload) {
    try {
      const { data } = await axios.post(`${API_URL}/api/users/login`, payload);
      const { msg, token, id } = data;
      if (msg) {
        VueCookies.set("token", token, "1h"); // Set token cookie
        VueCookies.set("user_id", id, "1h"); // Set user ID cookie
        commit("setUser", payload);
        toast.success(`${msg}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    } catch (e) {
      toast.error(`${e.message}`, {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  },

  async logoutUser({ commit }) {
    try {
      // Clear cookies
      VueCookies.remove("token");
      VueCookies.remove("user_id");
      commit("setUser", null);
      toast.success("Logged out successfully", {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (e) {
      toast.error(`Logout failed: ${e.message}`, {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  },

  async deleteUser({ dispatch }, id) {
    try {
      const { data } = await axios.delete(`${API_URL}/api/users/delete/${id}`);
      const { msg } = data;
      if (msg) {
        dispatch("fetchAllUsers");
        toast.success(`${msg}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    } catch (e) {
      toast.error(`${e.message}`, {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  },

  async updateUser({ dispatch }, payload) {
    try {
      const { data } = await axios.patch(`${API_URL}/api/users/update/${payload.id}`, payload);
      const { msg } = data;
      if (msg) {
        dispatch("fetchAllUsers");
        toast.success(`${msg}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    } catch (e) {
      toast.error(`${e.message}`, {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  },
};
