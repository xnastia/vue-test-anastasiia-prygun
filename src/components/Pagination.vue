<template>
  <div class="pagination">
    <ul>
      <router-link
        v-if="$store.state.currentPageNumber>1"
        :to="'/'+$store.state.socialMedia+'/1'"
        tag="li"
      >
        <button>First</button>
      </router-link>

      <router-link
        v-if="$store.state.currentPageNumber>1"
        :to="'/'+$store.state.socialMedia+'/'+($store.state.currentPageNumber - 1)"
        tag="li"
      >
        <button>Prev</button>
      </router-link>

      <router-link
        v-for="pageNumber in arrayOfPageNumbers"
        v-bind:data="pageNumber"
        v-bind:key="pageNumber"
        tag="li"
        :to="'/'+$store.state.socialMedia+'/'+pageNumber"
        :class="{'active': $store.state.currentPageNumber == pageNumber}"
        v-if="pageNumber > 0 && pageNumber <= $store.getters.totalPages"
      >
        <button>{{pageNumber}}</button>
      </router-link>

      <router-link
        v-if="$store.state.currentPageNumber<$store.getters.totalPages"
        :to="'/'+$store.state.socialMedia+'/'+($store.state.currentPageNumber + 1)"
        tag="li"
      >
        <button>Next</button>
      </router-link>

      <router-link
        v-if="$store.state.currentPageNumber<$store.getters.totalPages"
        :to="'/'+$store.state.socialMedia+'/'+$store.getters.totalPages"
        tag="li"
      >
        <button>Last</button>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arrayOfPageNumbers: []
    };
  },
  methods: {
    setCurrentPage(pageNumber) {
      let startIndex;
      if (!pageNumber || pageNumber < 1) {
        pageNumber = 1;
      }
      if (pageNumber > this.$store.getters.totalPages) {
        pageNumber = this.$store.getters.totalPages;
      }
      startIndex = this.$store.state.maxPostsOnPage * (pageNumber - 1);
      this.getPageNumbers(pageNumber);
      const postsToList = this.$store.state.filteredPosts.slice(
        startIndex,
        startIndex + this.$store.state.maxPostsOnPage
      );
      this.$store.commit(`postsOnCurrentPage`, postsToList);
    },
    getPageNumbers(pageNumber) {
      const totalPages = this.$store.getters.totalPages;
      this.arrayOfPageNumbers = [];
      if (this.$store.getters.totalPages <= 10) {
        for (let i = 1; i <= this.$store.getters.totalPages; i++) {
          this.arrayOfPageNumbers.push(i);
        }
        return;
      }
      if (pageNumber + 9 < this.$store.getters.totalPages) {
        for (let i = pageNumber; i <= pageNumber + 6; i++) {
          this.arrayOfPageNumbers.push(i);
        }
        return;
      }
      if (pageNumber + 9 >= this.$store.getters.totalPages) {
        for (
          let i = this.$store.getters.totalPages - 10;
          i <= this.$store.getters.totalPages;
          i++
        ) {
          this.arrayOfPageNumbers.push(i);
        }
        return;
      }
    }
  },
  watch: {
    $route(to, from) {
      if (from.params.source == to.params.source) {
        const page = to.params.page || 1;
        this.$store.commit(`setCurrentPage`, page);
      }
    }
  },
  mounted() {
    this.$store.watch(
      (state, getters) => state.currentPageNumber,
      () => {
        this.setCurrentPage(this.$store.state.currentPageNumber);
      }
    );
    this.$store.watch(
      (state, getters) => state.socialMedia,
      () => {
        this.setCurrentPage(1);
      }
    );
    this.$store.watch(
      (state, getters) => state.filteredPosts,
      () => {
        this.setCurrentPage(1);
      }
    );
    this.$store.watch(
      (state, getters) => state.socialMedia,
      () => {
        this.setCurrentPage(1);
      }
    );
  }
};
</script>

<style scoped>
.pagination {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: right;
  align-items: center;
}

.pagination ul li {
  display: inline-block;
  padding: 10px;
  border: 1px solid rgb(207, 216, 220);
  color: #aaaaaa;
  background-color: #ffffff;
}
.pagination ul li.active button {
  background: rgb(207, 216, 220);
  color: rgb(85, 110, 121);
}

.pagination ul li.active {
  background: rgb(207, 216, 220);
  color: rgb(85, 110, 121);
}

button {
  font-size: 16px;
  outline: 0;
  border: none;
  background-color: #ffffff;
  color: #aaaaaa;
}
</style>