<template>
  <div id="app-view" class="container-fluid">
    <nav class="fixed-top">
      <NavBanner />
      <TaskBar v-if="$route.path !== '/signup'" />
    </nav>
    <main :class="{ 'no-taskbar': $route.path === '/signup' }">
      <router-view />
    </main>
    <footer>
      <FooterComp />
    </footer>
  </div>
</template>

<script>
import NavBanner from "./components/NavBanner.vue";
import TaskBar from "./components/TaskBar.vue";
import FooterComp from "./components/FooterComp.vue";

export default {
  name: "AppComp",
  components: {
    NavBanner,
    TaskBar,
    FooterComp,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  background-color: whitesmoke;
}

main {
  transition: margin-top 0.3s ease;
}

.no-taskbar {
  margin-top: 8rem; /* Adjust this as needed for your layout */
}

@media screen and (max-width: 300px) {
  main {
    margin-top: 8rem;
    margin-bottom: 3rem;
  }
  footer {
    margin-bottom: 3rem;
  }
}

@media (min-width: 301px) and (max-width: 450px) {
  main {
    margin-top: 12rem;
    margin-bottom: 3rem;
  }
}

@media (min-width: 451px) and (max-width: 750px) {
  main {
    margin-top: 16rem;
    margin-bottom: 4rem;
  }
}

@media (min-width: 751px) {
  main {
    margin-top: 16rem;
    margin-bottom: 6rem;
  }
}
</style>
