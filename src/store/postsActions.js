import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { API_URL } from "../utils/index.js";

export const postsActions = {
  async fetchAllPosts({ commit }) {
    try {
      const { data } = await axios.get(`${API_URL}/api/posts/all`);
      if (data) {
        commit("setPosts", data);
      } else {
        toast.error("No posts found", {
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

  async fetchPost({ commit }, id) {
    try {
      const { data } = await axios.get(`${API_URL}/api/posts/${id}`);
      if (data) {
        commit("setPost", data);
      } else {
        toast.error("No post found", {
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

  async fetchRecentPosts({ commit }) {
    try {
      const { data } = await axios.get(`${API_URL}/api/posts/recent`);
      if (data) {
        commit("setRecentPosts", data);
      } else {
        toast.error("No recent posts found", {
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

  async createPost({ dispatch }, payload) {
    try {
      const { data } = await axios.post(`${API_URL}/api/posts/create`, payload);
      const { msg } = data;
      if (msg) {
        dispatch("fetchAllPosts");
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

  async updatePost({ dispatch }, payload) {
    try {
      const { data } = await axios.patch(
        `${API_URL}/api/posts/update/${payload.id}`,
        payload
      );
      const { msg } = data;
      if (msg) {
        dispatch("fetchAllPosts");
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

  async deletePost({ dispatch }, id) {
    try {
      const { data } = await axios.delete(`${API_URL}/api/posts/delete/${id}`);
      const { msg } = data;
      if (msg) {
        dispatch("fetchAllPosts");
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
