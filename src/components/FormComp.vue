<template>
    <div class="form-container">
      <p class="title">{{ isLoginMode ? "Sign In" : "Create Account" }}</p>
      <form class="form" @submit.prevent="handleSubmit">
        <div class="input-group" v-if="!isLoginMode">
          <label for="name">Username</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Sarah Smith"
            v-model="username"
            required
          />
        </div>
        <div class="input-group">
          <label for="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Type your email..."
            v-model="email"
            required
          />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Type your password..."
            v-model="password"
            required
          />
        </div>
        <button class="submit" type="submit">
          {{ isLoginMode ? "Sign In" : "Sign Up" }}
        </button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: "FormComp",
    props: {
      isLoginMode: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        username: "",
        email: "",
        password: "",
      };
    },
    methods: {
      handleSubmit() {
        const payload = {
          email: this.email,
          password: this.password,
        };
        
        if (!this.isLoginMode) {
          payload.username = this.username;
          // Handle sign-up logic here
          console.log("Sign Up:", payload);
        } else {
          // Handle sign-in logic here
          console.log("Sign In:", payload);
        }
      },
    },
  };
  </script>

<style scoped>
.form-container {
  width: 320px;
  border-radius: 0.75rem;
  background-color: rgba(17, 24, 39, 1);
  padding: 2rem;
  color: rgba(243, 244, 246, 1);
}

.title {
  text-align: center;
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
}

.form {
  margin-top: 1.5rem;
}

.input-group {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.input-group label {
  display: block;
  color: rgba(156, 163, 175, 1);
  margin-bottom: 4px;
}

.input-group input {
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid rgba(55, 65, 81, 1);
  outline: 0;
  background-color: rgba(17, 24, 39, 1);
  padding: 0.75rem 1rem;
  color: rgba(243, 244, 246, 1);
  transition: 0.3s ease;
  margin-bottom: 1rem;
}

.input-group input:focus {
  border-color: rgba(167, 139, 250);
}

.submit {
  display: block;
  width: 100%;
  background-color: rgba(167, 139, 250, 1);
  padding: 0.75rem;
  text-align: center;
  color: rgba(17, 24, 39, 1);
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
}
.submit:hover {
  background-color: rgba(156, 163, 175, 1);
}
.submit:active {
  background-color: rgb(53, 66, 90);
}

.social-email {
  display: flex;
  align-items: center;
  padding-top: 1rem;
}

.line {
  height: 1px;
  flex: 1 1 0%;
  background-color: rgba(55, 65, 81, 1);
}

.social-email .email {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: rgba(156, 163, 175, 1);
}

.social-icons {
  display: flex;
  justify-content: center;
}

.social-icons .icon {
  border-radius: 0.125rem;
  padding: 0.75rem;
  border: none;
  background-color: transparent;
  margin-left: 8px;
}

.social-icons .icon svg {
  height: 1.25rem;
  width: 1.25rem;
  fill: #fff;
}

@media (max-width: 450px) {
  .form-container {
    width: 100%;
    padding: 1rem;
    border-radius: 0;
  }

  .social-icons .icon {
    margin: 3rem 0;
  }
}
</style>
