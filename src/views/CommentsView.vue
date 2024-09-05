<template>
  <div>
    <Loader v-if="loading" />
    <div id="comments-view">
      <div class="post">
        <PostCard
          :profileImage="post?.profile_picture"
          :postDate="post?.created_at"
          :username="post?.username"
          :postContent="post?.content"
          :postId="post?.post_id"
        />
      </div>
      <div class="comments-wrapper">
        <CommentSection :comments="comments" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PostCard from "@/components/PostCard.vue";
import Loader from "@/components/LoaderComp.vue";
import CommentSection from "@/components/CommentSection.vue";

export default {
  name: "CommentsView",
  components: {
    PostCard,
    CommentSection,
    Loader,
  },
  computed: {
    ...mapState(["comments", "posts"]),
    post() {
      return this.posts[+this.$route.params.id - 1];
    },
  }
,
  data() {
    return {
      loading: true,
    };
  },
  methods: {
    async commentsFromPost() {
      try {
        const postId = this.$route.params.id;
        await this.$store.dispatch("fetchAllCommentsFromPost", postId);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        this.loading = false;
      }
    },
  },
  created() {
    this.commentsFromPost();
  },
};
</script>
