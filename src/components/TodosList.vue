<template>
  <div>
    <div v-for="todo in todos" :key="todo.id">
      <TodoItem
        v-bind:todo="todo"
        v-on:update-todo="updateTodo"
        v-on:check-todo="$emit('check-todo', todo)"
        v-on:del-todo="$emit('del-todo', todo.id)"
      />
    </div>
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

<style scoped></style>
