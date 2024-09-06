<template>
  <div
    id="comment-wrapper"
    class="container mt-5 border-1 border-dark p-3 rounded"
  >
    <div v-for="comment in comments" :key="comment.comment_id" class="row mb-3 bg-secondary p-3 rounded">
      <div class="profile d-flex justify-content-between">
        <div class="comment-header">
          <span class="comment-image">
            <img :src="comment.profile_picture" class="img-fluid profile-picture" />
          </span>
          <span class="comment-username">{{ comment.username }}</span>
        </div>
        <div class="comment-body">
          <span>{{ comment.comment_text }}</span>
        </div>
        <div class="date">
          <span>{{ formatDate(comment.created_at) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formattedDate } from "@/utils";

export default {
  name: "CommentSection",
  props: ["comments"],
  methods: {
    formatDate(dateString) {
      return formattedDate(dateString);
    }
  }
};
</script>

<style scoped>
.profile-picture {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 1px solid black;
  overflow: hidden;
  margin-right: 1rem;
}

.comment-username {
  text-transform: capitalize;
}
</style>
