<template>
  <header class="header">
    <h1>Todo List</h1>
    <div id="nav">
      <router-link to="/">Home</router-link>&nbsp;|&nbsp; <router-link to="/about">About</router-link>&nbsp;|&nbsp;
      <router-link to="/completed">Completed Todos</router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderComp",
};
</script>

<style scoped>
header {
  background: rgb(245, 173, 71);
  color: rgb(55, 55, 55);
  text-align: center;
  padding: 10px;
}

header a {
  color: rgb(55, 55, 55);
  padding-right: 5px;
  text-decoration: none;
}
</style>
