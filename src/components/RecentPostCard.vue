<template>
  <div class="card">
    <div class="post">
      <span class="text">{{ postContent }}</span>
    </div>
    <div class="user-info">
      <span class="profile"><img :src="postAuthorProfile" /></span>
      <span class="username">{{ username }}</span>
      <router-link :to="{ name: 'comments', params: { id: postId } }" class="view-comments">
        View
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecentPostCard",
  props: ["username", "postAuthorProfile", "postContent", "postId"],
};
</script>


<style scoped>
.card {
  width: 12rem;
  height: 16rem;
  box-shadow: 0px 1px 13px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 0.5rem;
  padding-bottom: 1rem;
  transition: all 120ms;
  position: relative;
}

.card:active {
  transform: scale(0.98);
}

.user-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: auto;
}

.card .profile {
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: 0.9rem;
  color: #000;
}

.card .profile img {
  width: 2rem;
  aspect-ratio: 1;
  border: 1px solid #00ac7c;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 0.5rem;
}

.card .username {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
  font-weight: 400;
  color: #000;
  text-transform: capitalize;
}

.view-comments {
  font-size: 0.9rem;
  color: #00ac7c;
  text-decoration: none;
  font-weight: bold;
  margin-left: auto;
}

.post {
  background: rgb(241, 241, 241);
  width: 100%;
  height: calc(100% - 4rem); 
  display: grid;
  place-items: center;
  overflow: hidden;
}

.post .text {
  font-size: 1rem;
  font-weight: 600;
  color: #000;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}
</style>
