import { mount } from "@vue/test-utils";
import AddTodo from "../../src/components/AddTodo.vue";

describe("AddTodo.vue", () => {
  it("renders add todo", () => {
    const wrapper = mount(AddTodo);

    expect(wrapper).toBeTruthy();
  });

  it("add todo error prop to be set", () => {
    const wrapper = mount(AddTodo);

    const error = wrapper.find("#error");
    expect(error.exists()).toBe(false);

    const submit = wrapper.find("#submit");
    expect(submit.exists()).toBe(true);
    submit.trigger("click");

    // expect(error.text()).toBe("Todo must have a description");
  });

  // it("add new todo", () => {
  //   const wrapper = mount(AddTodo, {
  //     propsData: { description: "this todo" },
  //   });

  //   const addTodo = jest.fn();

  //   wrapper.setMethods({
  //     addTodo: addTodo,
  //   });

  //   wrapper.find("#submit").trigger("click");

  //   expect(addTodo).toHaveBeenCalled();
  // });
});
