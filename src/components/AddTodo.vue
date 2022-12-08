<template>
  <div class="container">
    <form @submit="addTodo">
      <input
        :class="{ 'error-input': error }"
        id="add-todo"
        type="text"
        v-model="description"
        name="description"
        placeholder="Add Todo..."
      />
      <input type="submit" value="Submit" class="btn" />
    </form>
    <span v-if="error" class="error">{{ error }}</span>
  </div>
</template>

<script>
export default {
  name: "AddTodo",
  data() {
    return {
      description: "",
      error: null,
    };
  },
  methods: {
    addTodo(e) {
      e.preventDefault();

      if (this.description) {
        this.error = null;
        const newTodo = {
          description: this.description,
          completed: false,
        };

        // @ Send todo to parent
        this.$emit("add-todo", newTodo);

        // @ Cleaning form after submit
        this.description = "";
      } else {
        this.error = "Todo must have a description";
      }
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

.error {
  color: red;
}

.error-input {
  border-color: red;
}
</style>
