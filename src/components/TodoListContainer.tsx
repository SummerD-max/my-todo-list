import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router";
import type { TodoItem as TodoItemType } from "../types";
import AddButton from "./AddButton";
import Filter from "./Filter";
import Modal from "./Modal";
import TodoItem from "./TodoItem";
import Menu from "./Menu";

const STATUS_RANK = {
  doing: 2,
  done: 1,
};

function TodoListContainer() {
  const [todoList, setTodoList] = useState<TodoItemType[]>(function () {
    const savedData = localStorage.getItem("todoList");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        return parsedData
          .map((item: TodoItemType) => ({
            ...item,
            reminderTime: item.reminderTime
              ? new Date(item.reminderTime)
              : null,
          }))
          .sort(
            (a: TodoItemType, b: TodoItemType) =>
              STATUS_RANK[b.status] - STATUS_RANK[a.status],
          );
      } catch (error) {
        console.error("Failed to parse saved todo list:", error);
      }
    }

    return [];
  });

  useEffect(
    function () {
      localStorage.setItem("todoList", JSON.stringify(todoList));
    },
    [todoList],
  );

  const [editItemId, setEditItemId] = useState(-1);
  const [URLSearchParams] = useSearchParams();
  const currentFilter = URLSearchParams.get("status") || "all";

  let filteredTodoList;
  if (currentFilter === "all") filteredTodoList = todoList;
  else {
    filteredTodoList = todoList.filter((item) => item.status === currentFilter);
  }

  const toggleEditById = (Id: number) => {
    setEditItemId(Id);
  };

  const editTodoItem = (newTodo: TodoItemType) => {
    const originalTodoStatus = todoList.find(
      (item) => item.id === newTodo.id,
    )?.status;

    const newTodoList = [
      ...todoList.map((item) => {
        if (item.id !== newTodo.id) return item;
        else return newTodo;
      }),
    ];
    if (originalTodoStatus !== newTodo.status) {
      // Status changed, move the item to the top or bottom based on status
      newTodoList.sort((a, b) => STATUS_RANK[b.status] - STATUS_RANK[a.status]);
    }

    setTodoList(newTodoList);
    toast.success("Todo item updated!");
  };

  const AddTodoItem = () => {
    const newId = Date.now();
    const newTodo: TodoItemType = {
      id: newId,
      name: "",
      detail: "",
      status: "doing",
    };
    setTodoList((prev) => [newTodo, ...prev]);
    toggleEditById(newId);
    toast.success("New todo item added!");
  };

  const deleteTodoItem = (itemToDelete: TodoItemType) => {
    console.log("delete!");
    setTodoList((todoList) =>
      todoList.filter((item) => {
        return item.id !== itemToDelete.id;
      }),
    );
    toast.success("Todo item deleted!");
  };

  return (
    <>
      <Filter />

      <div className="mt-5">
        <AddButton AddTodoItem={AddTodoItem} todoList={todoList} />
      </div>

      <Menu>
        <Modal>
          <ul className="mt-2 divide-y-1 divide-black/20 dark:divide-white/20">
            <AnimatePresence>
              {filteredTodoList.map((item) => (
                <motion.li
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{
                    duration: 0.1,
                    ease: "easeInOut",
                    layout: { duration: 0.2 },
                  }}
                >
                  <TodoItem
                    item={item}
                    editTodoItem={editTodoItem}
                    beEdited={editItemId === item.id}
                    toggleEdit={() => {
                      setEditItemId(item.id === editItemId ? -1 : item.id);
                    }}
                    deleteTodoItem={deleteTodoItem}
                  />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </Modal>
      </Menu>
    </>
  );
}

export default TodoListContainer;
