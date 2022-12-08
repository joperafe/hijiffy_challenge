<template>
  <div id="app">
    <AddTodo v-on:add-todo="addTodo" />
    <TodosList
      v-bind:todos="todos"
      v-on:del-todo="deleteTodo"
      v-on:check-todo="checkTodo"
      v-on:update-todo="updateTodo"
    />
  </div>
</template>

<script>
import TodosList from "../components/TodosList.vue";
import AddTodo from "../components/AddTodo.vue";
import axios from "axios";
import { VUE_APP_API_URL } from "../config/index";

export default {
  name: "HomeView",
  components: {
    TodosList,
    AddTodo,
  },
  data() {
    return {
      todos: [],
    };
  },
  methods: {
    addTodo(todo) {
      const { description, completed } = todo;
      axios
        .post(VUE_APP_API_URL, {
          description,
          completed,
        })
        .then((res) => (this.todos = [...this.todos, res.data]))
        .catch((err) => console.log(err));
    },
    deleteTodo(id) {
      axios
        .delete(`${VUE_APP_API_URL}/${id}`)
        .then(() => (this.todos = this.todos.filter((todo) => todo.id !== id)))
        .catch((err) => console.log(err));
    },
    // @ On check todo update todo completed state in the api
    checkTodo(todo) {
      const { id, completed } = todo;
      const newState = !completed;
      axios
        .put(`${VUE_APP_API_URL}/${id}`, {
          completed: newState,
        })
        .then((res) => (this.todos = [...this.todos]))
        .catch((err) => console.log(err));
    },
    // @ Update task description in the api
    updateTodo({ id, description }) {
      axios
        .put(`${VUE_APP_API_URL}/${id}`, {
          description,
        })
        .then(
          () =>
            (this.todos = this.todos.map((todo) => {
              if (todo.id === id) {
                return { ...todo, description };
              }
              return todo;
            }))
        )
        .catch((err) => console.log(err));
    },
  },
  created() {
    // Fetching todos from external api
    axios
      .get(`${VUE_APP_API_URL}?sortBy=createdAt&order=desc&page=1&limit=10`)
      .then((res) => {
        this.todos = res.data;
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
}

.btn {
  display: inline-block;
  border: none;
  background: #555;
  color: #fff;
  padding: 7px 20px;
  cursor: pointer;
}

.btn:hover {
  background: #666;
}
</style>
