<template>
  <div>
    <p>{{$store.getters.totalPosts}} items total</p>
    <ul class="post-list">
      <li v-for="post in $store.state.pagePostsList">
        <Post :post="post"></Post>
      </li>
    </ul>
  </div>
</template>

<script>
import Post from "./Post";

export default {
  components: {
    Post
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.post-list {
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-gap: 1rem 1rem;
  margin: 0;
  padding: 0 1.5rem 1.5rem 1.5rem;
  position: relative;
  top: -60px;
  background-color: rgb(250, 250, 250);
}
p {
  font-weight: 600;
  position: relative;
  top: -60px;
  left: 15px;
}
</style>