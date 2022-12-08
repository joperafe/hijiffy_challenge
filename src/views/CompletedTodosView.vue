<template>
  <div class="completed">
    <div v-if="todos.length">
      <h2>Check out all your completed tasks!</h2>
      <p>In this section you'll be able to see a list with all the completed tasks.</p>
      <div class="list">
        <ol>
          <li v-for="todo in todos" :key="todo.id">{{ todo.description }}</li>
        </ol>
      </div>
    </div>
    <div v-else class="wrapper">
      <p>No completed Todos to be displayed...</p>
      <h3>Be strong and start completing those Todos!</h3>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { VUE_APP_API_URL } from "../config/index";

export default {
  name: "CompletedTodosView",
  data() {
    return {
      todos: [],
    };
  },
  created() {
    // Fetching completed todos from external api
    axios
      .get(`${VUE_APP_API_URL}?sortBy=createdAt&order=desc&completed=true`)
      .then((res) => {
        this.todos = res.data;
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style scoped>
.completed {
  padding: 30px;
}

.completed h1 {
  padding-bottom: 20px;
}

.list {
  padding: 50px;
  margin: 20px;
  background-color: rgb(245 173 71 / 41%);
  border-radius: 7px;
}
.list ol > li::marker {
  font-weight: bold;
}

.wrapper {
  width: 100%;
  text-align: center;
  padding: 50px;
}
.wrapper p {
  padding-bottom: 20px;
}
</style>
