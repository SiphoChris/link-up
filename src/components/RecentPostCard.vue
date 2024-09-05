<template>
  <div class="card">
    <div class="user-info">
      <span class="username">{{ username }}</span>
      <span class="profile"><img :src="postAuthorProfile" /></span>
    </div>
    <div class="post">
      <span class="text">{{ postContent + "abcdefghijklmnopqrstuvwxyz" }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecentPostCard",
  props: ["username", "postAuthorProfile", "postContent"],
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
  justify-content: center;
  background: #fff;
  padding: 0.5rem;
  padding-bottom: 3.4rem;
  transition: all 120ms;
  position: relative;
}

.card::after {
  content: "View More";
  padding-top: 0.5rem;
  border-radius: 0 0 0.4rem 0.4rem;
  text-align: center;
  position: absolute;
  bottom: -60px;
  background: #00ac7c;
  color: #fff;
  height: 2.5em;
  width: 100%;
  font-weight: 600;
  text-transform: uppercase;
  opacity: 0;
  transition: all 80ms;
}

.card:hover::after {
  bottom: 0;
  opacity: 1;
}

.card:active {
  transform: scale(0.98);
}

.user-info {
  display: flex;
  align-items: center;
}

.card .profile {
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: 0.9rem;
  position: absolute;
  left: 0.625rem;
  bottom: 0.625rem;
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
  position: absolute;
  left: 3.5rem;
  bottom: 1rem;
  font-weight: 400;
  color: #000;
  text-transform: capitalize;
}

.post {
  background: rgb(241, 241, 241);
  width: 100%;
  height: calc(100% - 3rem); 
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
