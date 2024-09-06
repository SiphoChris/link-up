<template>
    <div>
      <Loader v-if="loading" />
      <div v-else id="comments-view">
        <div class="post">
          <PostCard>
            <template v-slot:cardHeader>
              <div class="card-header">
                <div class="profile">
                  <span class="profile-image">
                    <img :src="post?.profile_picture" class="img-fluid" />
                  </span>
                  <span class="username">{{ post?.username }}</span>
                </div>
                <span class="date">{{ formatDate(post?.created_at) }}</span>
              </div>
            </template>
            <template v-slot:cardBody>
              <div class="card-body">
                <div class="content">
                  {{ post?.content }}
                </div>
              </div>
            </template>
          </PostCard>
        </div>
        <div class="comments-wrapper">
          <CommentSection :comments="post?.comments || []" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState } from "vuex";
  import PostCard from "@/components/PostCard.vue";
  import Loader from "@/components/LoaderComp.vue";
  import CommentSection from "@/components/CommentSection.vue";
  import { formattedDate } from "@/utils";
  
  export default {
    name: "CommentsView",
    components: {
      PostCard,
      CommentSection,
      Loader,
    },
    computed: {
      ...mapState(["post"]),
    },
    data() {
      return {
        loading: true,
      };
    },
    methods: {
      async getPostAndComments() {
        try {
          const postId = this.$route.params.id;
          await this.$store.dispatch("fetchPost", postId);
        } catch (error) {
          console.error("Error fetching post:", error);
        } finally {
          this.loading = false;
        }
      },
      formatDate(dateString) {
        return formattedDate(dateString);
      },
    },
    created() {
      this.getPostAndComments();
    },
  };
  </script>
  
  <style scoped>
  #comments-view {
    padding: 1rem;
  }
  
  .post {
    margin-bottom: 2rem;
  }
  </style>
  