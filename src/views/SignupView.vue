<template>
  <div id="sign-up" class="d-flex justify-content-center">
    <Form :isLoginMode="isLoginMode"/>
  </div>
</template>

<script>
import Form from '../components/FormComp.vue';

export default {
  name: 'SignupView',
  components: {
    Form,
  },
  data() {
    return {
      isLoginMode: false,
    };
  },
};
</script>

<style scoped>

</style>
