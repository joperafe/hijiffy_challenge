<template>
  <div>
    <div v-if="todosToShow.length">
      <div class="info-wrapper">
        <div class="filter-wrapper">
          <p>Filter by state:</p>
          <button class="filter" @click="filterTodos">{{ filterText }}</button>
        </div>
        <div class="total-wrapper">
          <p><b>Todos total:</b> {{ this.todosTotal }}</p>
        </div>
      </div>
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
      filterText: "Show all",
      page: 1,
      currentPage: 1,
      pageNumber: 0,
      pageSize: 10,
      todosTotal: 0,
    };
  },
  methods: {
    filterTodos() {
      switch (this.filterValue) {
        case null:
          this.filterValue = true;
          this.filterText = "Incompleted";
          return;
        case true:
          this.filterValue = false;
          this.filterText = "Completed";
          return;
        case false:
          this.filterText = "Show all";
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
        this.todosTotal = this.todos.length;
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

.info-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter-wrapper {
  margin: 0 0 5vh 5vw;
}
.filter {
  padding: 6px;
  width: 100px;
}

.total-wrapper {
  margin-right: 5vw;
}
</style>
