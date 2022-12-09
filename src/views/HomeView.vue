<template>
  <div id="app">
    <div v-if="loading"><Loader /></div>
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
import Loader from "../components/layout/Loader.vue";
import axios from "axios";
import { VUE_APP_API_URL } from "../config/index";

export default {
  name: "HomeView",
  components: {
    TodosList,
    AddTodo,
    Loader,
  },
  data() {
    return {
      todos: [],
      loading: false,
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
        // ! res.data first so that the newly created todo goes to the top of the list
        .then((res) => (this.todos = [res.data, ...this.todos]))
        .catch((err) => console.log(err));
    },
    deleteTodo({ id, description }) {
      if (confirm(`Do you really want to delete task "${description}"?`)) {
        axios
          .delete(`${VUE_APP_API_URL}/${id}`)
          .then(() => (this.todos = this.todos.filter((todo) => todo.id !== id)))
          .catch((err) => console.log(err));
      }
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
    this.loading = true;
    // @ Fetching todos from external api
    // &page=1&limit=10
    axios
      .get(`${VUE_APP_API_URL}?sortBy=createdAt&order=desc`)
      .then((res) => {
        this.todos = res.data;
      })
      .catch((err) => console.log(err))
      .finally(() => (this.loading = false));
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
  background: rgb(55, 55, 55);
  color: #fff;
  padding: 7px 20px;
  cursor: pointer;
}

.btn:hover {
  background: #666;
}
</style>
