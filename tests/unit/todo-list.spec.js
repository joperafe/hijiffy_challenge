import { mount } from "@vue/test-utils";
import TodosList from "../../src/components/TodosList.vue";

describe("TodosList.vue", () => {
  it("renders todos list", () => {
    const todo = { id: 1, description: "one todo", completed: false };

    const wrapper = mount(TodosList, {
      propsData: { todos: [{ todo: todo }] },
    });

    expect(wrapper).toBeTruthy();
  });
});
