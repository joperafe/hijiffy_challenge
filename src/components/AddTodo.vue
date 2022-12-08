<template>
  <div class="container">
    <form @submit="addTodo">
      <input type="text" v-model="description" name="description" placeholder="Add Todo..." />
      <input type="submit" value="Submit" class="btn" />
    </form>
  </div>
</template>

<script>
export default {
  name: "AddTodo",
  data() {
    return {
      description: "",
    };
  },
  methods: {
    addTodo(e) {
      e.preventDefault();

      const newTodo = {
        description: this.description,
        completed: false,
      };

      // @ Send todo to parent
      this.$emit("add-todo", newTodo);

      // @ Cleaning form after submit
      this.description = "";
    },
  },
};
</script>

<style scoped>
.container {
  text-align: -webkit-center;
  padding: 20px;
}

form {
  width: 50%;
  display: flex;
}

input[type="text"] {
  flex: 10;
  padding: 5px;
}

.btn {
  margin-left: 2px;
  border-radius: 5px;
}
</style>
