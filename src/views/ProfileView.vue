<template>
    <div id="profile-view">
      <div class="wrapper">
        <Loader v-if="loading" />
        <ProfileCard :user="user" />
      </div>
    </div>
  </template>
  
  <script>
  import ProfileCard from "../components/ProfileComp.vue";
  import Loader from "../components/LoaderComp.vue";
  import { mapState } from "vuex";
  
  export default {
    name: "ProfileView",
    components: {
      ProfileCard,
      Loader,
    },
    data() {
      return {
        loading: true,
      };
    },
    async created() {
      await this.$store.dispatch("fetchUserAndPosts");
      this.loading = false;
    },
    computed: {
      ...mapState(["user"]),
    },
  };
  </script>
  
  <style scoped>
  .wrapper {
    background-color: #4c8bb6;
  }
  </style>
  