export default {
    setUser: (state, user) => {
        state.user = user
    },
    setPosts: (state, posts) => {
        state.posts = posts
    },
    setComments: (state, comments) => {
        state.comments = comments
    },
    setRecentPosts: (state, recentPosts) => {
        state.recentPosts = recentPosts
    }
}