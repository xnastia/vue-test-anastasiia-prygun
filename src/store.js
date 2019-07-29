import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    pendingPosts: [],
    approvedPosts: [],
    rejectedPosts: [],
    filteredPosts: [],
    pagePostsList: [],
    socialMedia: '',
    currentPostStatus: '',
    currentPageNumber: 0,
    maxPostsOnPage: 8,
  },
  mutations: {
    setLoading(state, val) {
      state.loading = val
    },
    setPendingPosts(state, posts) {
      state.pendingPosts = posts;
    },
    setApprovedPosts(state, posts) {
      state.approvedPosts = posts;
    },
    setRejectedPosts(state, posts) {
      state.rejectedPosts = posts;
    },
    setFilteredPosts(state, posts) {
      state.filteredPosts = posts || [];
    },
    setCurrentPagePosts(state, posts) {
      state.pagePostsList = posts;
    },
    setSocialMedia(state, socialMedia) {
      state.socialMedia = socialMedia;
    },
    setCurrentPostStatus(state, postStatus) {
      state.currentPostStatus = postStatus;
    },
    setCurrentPage(state, pageNumber) {
      state.currentPageNumber = pageNumber;
    },
    pushIApprovedPost(state, item) {
      state.approvedPosts.push(item);
    },
    pushRejectedPost(state, item) {
      state.rejectedPosts.push(item);
    },
    removeApprovedPost(state, item) {
      const index = state.approvedPosts.indexOf(item);
      state.approvedPosts.splice(index, 1);
    },
    removeRejectedPost(state, item) {
      const index = state.rejectedPosts.indexOf(item);
      state.rejectedPosts.splice(index, 1);
    },
    removePendingPost(state, item) {
      const index = state.pendingPosts.indexOf(item);
      state.pendingPosts.splice(index, 1);
    },
    postsOnCurrentPage(state, posts) {
      state.pagePostsList = posts;
    },
  },
  getters: {
    pagePostsList: state => {
      switch(state.selectedPostStatus){
        case 'approved': return state.approvedPosts.length;
        case 'rejected': return state.rejectedPosts.length;
        case 'pending': return state.pendingPosts.length;
      }
    },
    totalPages: state => {
      return Math.ceil(state.filteredPosts.length / state.maxPostsOnPage);
    },
    totalPosts: state => {
      return state.filteredPosts.length;
    },
    getPostsBySource: state => arrayOfPosts => {
      return arrayOfPosts.filter(post => post.social_network.toLowerCase() === state.socialMedia.toLowerCase());
    }
  },
   
}
)
