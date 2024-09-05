<template>
  <div class="card">
    <div class="card-header">
      <div class="profile">
        <span class="profile-image"
          ><img :src="profileImage" class="img-fluid"
        /></span>
        <span class="username">{{ username }}</span>
      </div>
      <span class="date">{{ formattedDate }}</span>
    </div>
    <div class="card-body">
      <div class="content">
        {{ postContent }}
      </div>
    </div>
    <div class="card-interactions">
      <router-link :to="{ name: 'comments', params: { id: postId } }">
        <button type="button">Comments...</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { formattedDate } from "../utils/index.js";

export default {
  name: "PostCardComp",
  props: ["profileImage", "username", "postDate", "postContent", "postId"],
  computed: {
    formattedDate,
  },
};
</script>

<style scoped>
.profile-image img {
  width: 3rem;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 1px solid #ccc;
}
.profile {
  display: flex;
  align-items: center;
  gap: 2rem;
}
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.username {
  text-transform: capitalize;
}
.content {
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.3rem;
  line-height: 1.5rem;
  color: #000;
  margin: 1rem 0;
  padding: 0;
  max-height: 5rem;
}
.card-body {
  padding: 3rem 0;
}
.card {
  width: 100%;
  box-shadow: 0px 1px 13px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  background: #fff;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}
button {
  border: none;
  background: none;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
  font-weight: 400;
  color: #000;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: #dcdcdc;
  margin: 1.5rem 0;
  transition: background-color 0.2s ease-in-out;
}
</style>
