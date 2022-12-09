<template>
  <div>
    <div v-if="todosToShow.length">
      <button class="filter" @click="filterTodos">Filter by state</button>
      <div v-for="todo in todosToShow" :key="todo.id">
        <TodoItem
          v-bind:todo="todo"
          v-on:update-todo="updateTodo"
          v-on:check-todo="$emit('check-todo', todo)"
          v-on:del-todo="$emit('del-todo', todo)"
        />
      </div>
    </div>
    <div v-else class="wrapper">
      <p>No Todos to be displayed...</p>
      <h3>Start adding new Todos to the list!</h3>
    </div>
    <FooterComp :pageNumber="pageNumber" :currentPage="currentPage" v-on:change-page="changePage" />
  </div>
</template>

<script>
import FooterComp from "./layout/FooterComp.vue";
import TodoItem from "./TodoItem.vue";
import chunkArray from "../utils/chunkArray";

export default {
  name: "TodosList",
  components: {
    TodoItem,
    FooterComp,
  },
  props: ["todos"],
  data() {
    return {
      // @ Todos filter value
      filterValue: null,
      page: 1,
      currentPage: 1,
      pageNumber: 0,
      pageSize: 10,
    };
  },
  methods: {
    filterTodos() {
      switch (this.filterValue) {
        case null:
          this.filterValue = true;
          return;
        case true:
          this.filterValue = false;
          return;
        case false:
          this.filterValue = null;
          return;
        default:
          break;
      }
    },
    // @ Update todo description
    updateTodo({ id, description }) {
      this.$emit("update-todo", { id, description });
    },
    // @ Change current page
    changePage(e) {
      this.currentPage = e;
    },
  },
  computed: {
    // @ Applying filters and pagination to todos
    // First apply the filter by state with filterValue: completed(true), incompleted(false) or no filter(null)
    // After the filter chunk the todos into arrays to display with pagination according to the number of todos per page, pageSize(default=10)
    todosToShow() {
      if (this.todos.length) {
        const filteredTodos = this.todos.filter((item) => item.completed !== this.filterValue);

        const chunks = chunkArray(filteredTodos, this.pageSize);
        this.pageNumber = chunks.length;

        return chunks[this.currentPage - 1];
      }
      return [];
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

.filter {
  margin: 0 0 20px 20px;
  padding: 5px;
}
</style>
