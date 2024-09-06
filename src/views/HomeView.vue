<template>
  <div id="home-view">
    <main>
      <section id="recent-posts">
        <h3 class="text-center">Recent Posts</h3>
        <RecentPostWrapper />
      </section>
      <section id="posts-list">
        <Loader v-if="loading" />
        <ListLayout>
          <template v-slot:list-wrapper>
            <PostCard
              v-for="post in posts"
              :key="post.post_id"
              :postId="post.post_id"
              :postContent="post.content"
              :postDate="post.created_at"
              :profileImage="post.profile_picture"
              :username="post.username"
            />
          </template>
        </ListLayout>
      </section>
    </main>
  </div>
</template>

<script>
import Loader from "@/components/LoaderComp.vue";
import RecentPostWrapper from "@/components/RecentPostWrapper.vue";
import ListLayout from "@/components/ListLayout.vue";
import PostCard from "@/components/PostCard.vue";
import { mapState } from "vuex";

export default {
  name: "HomeView",
  components: {
    RecentPostWrapper,
    ListLayout,
    PostCard,
    Loader,
  },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapState(["posts"]),
  },
  methods: {
    async getAllPosts() {
      await this.$store.dispatch("fetchAllPosts");
      this.loading = false;
    },
  },
  created() {
    this.getAllPosts();
  },
};
</script>
<style scoped>
#posts-list {
  margin-top: 4rem;
}
</style>
