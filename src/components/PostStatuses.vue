<template>
  <ul class="post-statuses">
    <li
      @click="selectPostsByStatus(`pending`, $store.state.pendingPosts)"
      :class="{'active': $store.state.currentPostStatus == `pending`}"
    >pending</li>
    <li
      @click="selectPostsByStatus(`approved`, $store.state.approvedPosts)"
      :class="{'active': $store.state.currentPostStatus == `approved`}"
    >approved</li>
    <li
      @click="selectPostsByStatus(`rejected`, $store.state.rejectedPosts)"
      :class="{'active': $store.state.currentPostStatus == `rejected`}"
    >rejected</li>
  </ul>
</template>

<script>
export default {
  methods: {
    selectPostsByStatus(status, posts) {
      this.$store.commit(`setCurrentPostStatus`, status);
      this.$store.commit(`setFilteredPosts`, posts);
    }
  },
  mounted() {
    this.$store.watch(
      (state, getters) => state.loading,
      isLoading => {
        if (!isLoading) {
          this.selectPostsByStatus(`pending`, this.$store.state.pendingPosts);
        }
      }
    );
  }
};
</script>

<style scoped>
.post-statuses {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
  list-style-type: none;
  justify-content: start;
  margin: 0;
  padding: 0;
  grid-row-gap: 0;
}
.post-statuses li {
  padding: 0.5rem;
  text-transform: uppercase;
  text-align: center;
  font-weight: 600;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  color: rgb(154, 154, 154);
}
.post-statuses li.active {
  border-bottom: 2px solid rgb(72, 141, 252);
  color: rgb(44, 152, 240);
}
@media screen and (max-width: 800px) {
  .post-statuses {
    grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
    justify-content: space-between;
  }
}
</style>


