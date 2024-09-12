<template>
  <div id="sign-up" class="d-flex justify-content-center">
    <FormComp :isLoginMode="isLoginMode" @submit="handleFormSubmit" />
  </div>
</template>

<script>
import FormComp from '../components/FormComp.vue';
import { mapActions } from 'vuex';

export default {
  name: 'SignupView',
  components: {
    FormComp,
  },
  data() {
    return {
      isLoginMode: false, // Set to true if you want to use it for login
    };
  },
  methods: {
    ...mapActions(['registerUser', 'loginUser']),
    async handleFormSubmit(payload) {
      try {
        if (this.isLoginMode) {
          await this.loginUser(payload);
        } else {
          await this.registerUser(payload);
        }
      } catch (error) {
        console.error("Error handling form submission:", error);
      }
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
