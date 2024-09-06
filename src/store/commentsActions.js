import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { API_URL } from "../utils/index";

export const commentsActions = {
  async fetchAllCommentsFromPost({ commit }, postId) {
    try {
      const { data } = await axios.get(`${API_URL}/api/comments/from/${postId}`);
      if (data) {
        commit("setComments", data);
      } else {
        toast.error("No comments found", {
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

  async fetchComment({ commit }, id) {
    try {
      const { data } = await axios.get(`${API_URL}/api/comments/${id}`);
      const { results } = data;
      if (results) {
        commit("setComment", results);
      } else {
        toast.error("No comment found", {
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

  async createComment({ dispatch }, payload) {
    try {
      const { data } = await axios.post(
        `${API_URL}/api/comments/create`,
        payload
      );
      const { msg } = data;
      if (msg) {
        dispatch("fetchAllCommentsFromPost", payload.postId);
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

  async deleteComment({ dispatch }, id) {
    try {
      const { data } = await axios.delete(`${API_URL}/api/comments/delete/${id}`);
      const { msg } = data;
      if (msg) {
        dispatch("fetchAllCommentsFromPost", id);
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
  }
};
