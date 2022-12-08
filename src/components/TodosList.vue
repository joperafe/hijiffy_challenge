<template>
  <div v-if="todos.length">
    <div v-for="todo in todos" :key="todo.id">
      <TodoItem
        v-bind:todo="todo"
        v-on:update-todo="updateTodo"
        v-on:check-todo="$emit('check-todo', todo)"
        v-on:del-todo="$emit('del-todo', todo.id)"
      />
    </div>
  </div>
  <div v-else class="wrapper">
    <p>No Todos to be displayed...</p>
    <h3>Start adding new Todos to the list!</h3>
  </div>
</template>

<script>
import TodoItem from "./TodoItem.vue";
export default {
  name: "TodosList",
  components: {
    TodoItem,
  },
  props: ["todos"],
  methods: {
    updateTodo({ id, description }) {
      this.$emit("update-todo", { id, description });
    },
  },
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  text-align: center;
  padding: 50px;
}
.wrapper p {
  padding-bottom: 20px;
}
</style>
