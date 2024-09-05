<template>
  <div class="recent-posts-wrapper m-auto">
    <div class="recent-posts container-fluid shadow-sm">
      <div class="horizontal-scroll py-3">
        <Loader v-if="loading" />
        <RecentPostCard v-for="post in recentPosts" :key="post.post_id" :username="post.username" :postAuthorProfile="post.profile_picture" :postContent="post.content" />
      </div>
    </div>
  </div>
</template>

<script>
import RecentPostCard from "./RecentPostCard.vue";
import Loader from "./LoaderComp.vue";
import { mapState } from "vuex";

export default {
  name: "RecentPosts",
  components: {
    RecentPostCard,
    Loader,
  },

  data() {
    return {
      loading: true,
    };
  },

  computed: {
    ...mapState(["recentPosts"]),
  },
  methods: {
    async getRecentPosts() {
      await this.$store.dispatch("fetchRecentPosts");
      this.loading = false;
    },
  },
  created() {
    this.getRecentPosts();
  },
};
</script>

<style scoped>
.recent-posts-wrapper {
  display: flex;
  justify-content: center;
  padding: 0 1rem;
}

.recent-posts {
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;
}

.recent-posts::-webkit-scrollbar {
  display: none;
}

.horizontal-scroll {
  display: flex;
  gap: 1rem;
  padding: 0.4rem;
  width: max-content;
}

.horizontal-scroll > * {
  scroll-snap-align: center;
}

@media (max-width: 576px) {
  .recent-posts-wrapper {
    max-width: 100%;
    padding: 0 0.5rem;
  }
}

@media (min-width: 577px) and (max-width: 768px) {
  .recent-posts-wrapper {
    max-width: 540px;
    padding: 0 1rem;
  }
}

@media (min-width: 769px) and (max-width: 992px) {
  .recent-posts-wrapper {
    max-width: 720px;
    padding: 0 1.5rem;
  }
}

@media (min-width: 993px) and (max-width: 1200px) {
  .recent-posts-wrapper {
    max-width: 960px;
    padding: 0 2rem;
  }
}

@media (min-width: 1201px) {
  .recent-posts-wrapper {
    max-width: 1140px;
    padding: 0 2rem;
  }
}
</style>
