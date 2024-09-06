<template>
  <div class="list-layout">
    <div class="list-content">
      <slot name="list-wrapper"> </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListLayout",
};
</script>

<style scoped>
.list-layout {
  display: flex;
  justify-content: center;
  padding: 0 0.5rem; /* Initial small padding */
}

.list-content {
  max-width: 600px; /* Max width to keep content centered */
  width: 100%;
}

/* Mobile screens */
@media (max-width: 576px) {
  .list-layout {
    padding: 0 0.5rem; /* Small gutter for mobile */
  }
}

/* Tablets and small desktops */
@media (min-width: 577px) and (max-width: 991px) {
  .list-layout {
    padding: 0 1rem; /* Medium gutter for tablets */
  }
}

/* Large desktops */
@media (min-width: 992px) {
  .list-layout {
    padding: 0 2rem; /* Larger gutter for large desktops */
  }
}

/* Extra-large desktops */
@media (min-width: 1200px) {
  .list-layout {
    padding: 0 3rem; /* Even larger gutter for extra-large screens */
  }
}
</style>
