<template>
  <div id="home-view">
    <main>
      <section id="recent-posts">
        <h3 class="text-start ms-1">Recent Posts</h3>
        <RecentPostWrapper />
      </section>
      <section id="posts-list">
        <ListLayout >
          <template v-slot:list-wrapper>
            <PostCard v-for="index in 10" :key="index" />
          </template>
        </ListLayout>
      </section>
    </main>
  </div>
</template>

<script>
import RecentPostWrapper from "@/components/RecentPostWrapper.vue";
import ListLayout from "@/components/ListLayout.vue";
import PostCard from "@/components/PostCard.vue";
export default {
  name: "HomeView",
  components: {
    RecentPostWrapper,
    ListLayout,
    PostCard,
  },
};
</script>
