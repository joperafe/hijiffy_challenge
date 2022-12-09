<template>
  <div class="container">
    <div v-for="page in pageNumber" :key="page">
      <p :class="{ selected: page === currentPage }" @click="$emit('change-page', page)">{{ page }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterComp",
  props: ["pageNumber", "currentPage"],
  methods: {},
};
</script>

<style scoped>
.container {
  padding: 20px;
  display: flex;
  justify-content: center;
}

.container p {
  padding: 5px;
  font-size: large;
  cursor: pointer;
}

.selected {
  text-decoration: underline;
  font-weight: bolder;
}
</style>
