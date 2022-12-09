import { mount } from "@vue/test-utils";
import TodoItem from "../../src/components/TodoItem.vue";

describe("TodoItem.vue", () => {
  it("renders todo item", () => {
    const todo = { id: 1, description: "one todo", completed: false };

    const wrapper = mount(TodoItem, {
      propsData: { todo: todo },
    });

    expect(wrapper).toBeTruthy();
  });

  it("renders the todo description", () => {
    const todoDescription = "one todo";

    const todo = { id: 1, description: todoDescription, completed: false };

    const wrapper = mount(TodoItem, {
      propsData: { todo: todo },
    });

    expect(wrapper.html()).toContain(todoDescription);
  });

  it("check todo checkbox", async () => {
    const todo = { id: 1, description: "one todo", completed: false };

    const wrapper = mount(TodoItem, {
      propsData: { todo: todo },
    });

    const checkbox = wrapper.find("#check-todo");
    await checkbox.setChecked();

    expect(checkbox.element.checked).toBeTruthy();
  });

  // it("call deleteTodo when delete button is clicked", async () => {
  //   const todo = { id: 1, description: "one todo", completed: false };

  //   const wrapper = mount(TodoItem, {
  //     propsData: { todo: todo },
  //   });

  //   const deleteMethodStub = sinon.stub();

  //   const deleteButton = wrapper.find("#del-todo");
  //   await deleteButton.trigger("click");

  //   expect(deleteMethodStub.called).toBeTruthy();
  // });
});
