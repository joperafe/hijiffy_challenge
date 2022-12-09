<template>
  <div class="todo-item" v-bind:class="{ 'is-complete': todo.completed }">
    <div class="wrapper">
      <input
        id="check-todo"
        @click="$emit('check-todo', todo)"
        type="checkbox"
        v-bind:checked="todo.completed"
        v-on:change="markComplete"
      />
      <p v-if="!editing" class="description">{{ todo.description }}</p>
      <div v-else class="description">
        <input type="text" v-model="newDescription" name="newDesc" :placeholder="todo.description" />
        <button class="btn-update" @click="updateTodo">Update</button>
      </div>
      <div class="actions">
        <button @click="enableEdit" class="edit">
          <div v-if="!editing">Edit</div>
          <div v-else>Cancel Edit</div>
        </button>
        <button id="del-todo" @click="$emit('del-todo', todo)" class="del">x</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: ["todo"],
  data() {
    return {
      editing: false,
      newDescription: "",
    };
  },
  methods: {
    // @ Handles todo completed mode flag
    markComplete() {
      this.todo.completed = !this.todo.completed;
    },
    // @ Handles todo editing mode flag
    enableEdit() {
      this.editing = !this.editing;
    },
    // @ Updating todo description
    updateTodo() {
      this.$emit("update-todo", { id: this.todo.id, description: this.newDescription });

      this.editing = false;
    },
  },
};
</script>

<style scoped>
.todo-item {
  display: flex;
  justify-content: center;
  background: #f4f4f4f4;
  padding: 10px;
  border-bottom: 1px #ccc dotted;
}

.wrapper {
  width: 60vw;
  display: flex;
  align-items: center;
}

.is-complete {
  text-decoration: line-through;
}

.description {
  padding: 10px;
}

.actions {
  margin-left: auto;
}
.edit {
  cursor: pointer;
  margin-right: 20px;
  border: none;
  background: none;
  font-weight: bold;
}

.del {
  background: #ff0000;
  color: #fff;
  border: none;
  padding: 5px 10px;
  margin-right: 20px;
  border-radius: 50%;
  cursor: pointer;
}

.btn-update {
  margin-left: 4px;
  cursor: pointer;
}
</style>
