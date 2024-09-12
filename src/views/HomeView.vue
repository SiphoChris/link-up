<template>
  <div id="home-view">
    <main>
      <section id="recent-posts">
        <h3 class="text-center">Recent Posts</h3>
        <RecentPostWrapper />
      </section>

      <section id="posts-list">
        <Loader v-if="loading" />
        <ListLayout v-else>
          <template v-slot:list-wrapper>
            <PostCard
              v-for="post in posts"
              :key="post.post_id"
            >
              <template v-slot:cardHeader>
                <div class="card-header">
                  <div class="profile">
                    <span class="profile-image">
                      <img :src="post.profile_picture" class="img-fluid" />
                    </span>
                    <span class="username">{{ post.username }}</span>
                  </div>
                  <span class="date">{{ formatDate(post.created_at) }}</span>
                </div>
              </template>
              <template v-slot:cardBody>
                <div class="card-body">
                  <div class="content">
                    {{ post.content }}
                  </div>
                </div>
              </template>
              <template v-slot:cardFooter>
                <div class="card-interactions">
                  <router-link :to="{ name: 'comments', params: { id: post.post_id } }">
                    <button id="comments-button" type="button">
                      <i class="bi bi-chat-left-dots-fill"></i> Comments
                    </button>
                  </router-link>
                </div>
              </template>
            </PostCard>
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
import { formattedDate } from "@/utils";

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
    formatDate(dateString) {
      return formattedDate(dateString);
    }
  },
  beforeMount() {
    this.getAllPosts();
  },
};
</script>

<style scoped>
#posts-list {
  margin-top: 4rem;
}
</style>
