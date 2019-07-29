<template>
  <div class="keyword-list-wrapper" v-if="this.$store.state.currentPostStatus == `pending`">
    <div class="keyword-list">
      <ul class="keyword-filter">
        <li class="keyword-filter__keyword-container" v-for="keyword in keywords" :key="keyword">
          <span class="keyword-filter__keyword-container_value">{{keyword}}</span>
          <span
            class="keyword-filter__keyword-container_remove-button"
            @click="removeKeyword(keyword)"
          >&times;</span>
        </li>
        <li class="keyword-filter__keyword-input-container">
          <input type="text" placeholder="+keyword" @keyup.enter="addKeyWord" v-model="inputData" />
        </li>
      </ul>
    </div>
    <div class="filter-button-wrapper">
      <div class="filter-button" @click="filterByKeywords">filter</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputData: "",
      keywordToRemove: "",
      keywords: [],
      backUpArray: []
    };
  },
  methods: {
    addKeyWord() {
      if (!this.keywords.includes(this.inputData)) {
        this.keywords.push(this.inputData);
      }
      this.inputData = "";
    },

    removeKeyword(keyword) {
      const index = this.keywords.indexOf(keyword);
      this.keywords.splice(index, 1);
    },

    filterByKeywords() {
      let postsFilteredByKeywords;
      if (!this.keywords.length) {
        postsFilteredByKeywords = this.backUpArray;
      } else {
        postsFilteredByKeywords = this.$store.state.filteredPosts.filter(
          post => {
            return this.keywords.some(keyword =>
              post.caption.toLowerCase().includes(keyword.toLowerCase())
            );
          }
        );
      }

      this.$store.commit(`setFilteredPosts`, postsFilteredByKeywords);
    }
  },
  mounted() {
    this.$store.watch(
      (state, getters) => state.currentPostStatus,
      status => {
        if (status == "pending") {
          this.backUpArray = this.$store.state.pendingPosts;
          this.filterByKeywords();
        }
      }
    );
  }
};
</script>

<style scoped>
.keyword-list-wrapper {
  padding-top: 15px;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 15px 15px;
}
.keyword-list {
  padding: 15px;
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  background: #ffffff;
}
.keyword-filter__keyword-container {
  background: #cacaca;
  padding: 10px 15px;
  border-radius: 50px;
  display: inline-grid;
  grid-template-columns: auto auto;
  grid-column-gap: 0.2rem;
  color: #474747;
  margin: 0 0.1rem;
}
.keyword-filter__keyword-container_value {
  font-size: 20px;
  line-height: 30px;
  font-weight: 600;
}
.keyword-filter__keyword-container_remove-button {
  font-size: 30px;
  line-height: 30px;
}
.keyword-filter__keyword-input-container {
  display: inline-block;
}
input {
  border: none;
  background: none;
  padding: 10px;
  font-size: 18px;
}
.filter-button {
  padding: 10px 20px;
  color: #ffffff;
  font-weight: 600;
  background: rgb(72, 141, 252);
  box-shadow: 0 1px 2px #8e8e8e;
  border-radius: 3px;
  border-radius: 2px;
  cursor: pointer;
  display: inline-block;
}
.filter-button-wrapper {
  text-transform: uppercase;
  display: grid;
  place-content: center center;
  background: #ffffff;
  padding: 0 0.5rem;
  height: 100%;
}

.keyword-filter {
  list-style: none;
  padding: 0rem;
  margin: 0;
}
</style>