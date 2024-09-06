# link-up

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).








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
