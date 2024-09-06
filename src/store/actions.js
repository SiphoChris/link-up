import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { API_URL } from "../utils/index";

export default {
  // users
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

  async fetchUser({ commit }, id) {
    try {
      const { data } = await axios.get(`${API_URL}/api/users/${id}`);
      const { results } = data;
      if (results) {
        commit("setUser", results);
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
      const { data } = await axios.post(
        `${API_URL}/api/users/register`,
        payload
      );
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

  async loginUser({ commit }, payload) {
    try {
      const { data } = await axios.post(`${API_URL}/api/users/login`, payload);
      const { msg } = data;
      if (msg) {
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
      const { data } = await axios.patch(
        `${API_URL}/api/users/update/${payload.id}`,
        payload
      );
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

  // posts
  async fetchAllPosts({ commit }) {
    try {
      const { data } = await axios.get(`${API_URL}/api/posts/all`);
      console.log(data);
      
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
      const { results } = data;
      console.log(data);
      console.log(results);
      
      if (results) {
        commit("setPost", results);
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
    //   console.log(data);
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

  // comments
  async fetchAllCommentsFromPost({ commit }, postId) {
    try {
      const { data } = await axios.get(`${API_URL}/api/comments/from/${postId}`);
      console.log(data);
      
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

  async updateComment({ dispatch }, payload) {
    try {
      const { data } = await axios.patch(
        `${API_URL}/api/comments/update/${payload.id}`,
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

  async deleteComment({ dispatch }, payload) {
    try {
      const { data } = await axios.delete(
        `${API_URL}/api/comments/delete/${payload.id}`
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
};
