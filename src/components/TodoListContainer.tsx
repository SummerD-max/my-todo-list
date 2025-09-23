import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TodoItem from "./TodoItem";
import { HiMiniPlus } from "react-icons/hi2";
import Modal from "./Modal";
import { useSearchParams } from "react-router";
import Filter from "./Filter";
import type { TodoItem as TodoItemType } from "../types";
import toast from "react-hot-toast";

function TodoListContainer() {
  const [todoList, setTodoList] = useState<TodoItemType[]>(function () {
    const savedData = localStorage.getItem("todoList");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        return parsedData.map((item: TodoItemType) => ({
          ...item,
          reminderTime: item.reminderTime ? new Date(item.reminderTime) : null,
        }));
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

  // 排序：doing在前，done在后
  const sortedTodoList = [...todoList].sort((a, b) => {
    const statusOrder = { doing: 1, done: 2 };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  let filteredTodoList;
  if (currentFilter === "all") filteredTodoList = sortedTodoList;
  else {
    filteredTodoList = sortedTodoList.filter(
      (item) => item.status === currentFilter,
    );
  }

  const toggleEditById = (Id: number) => {
    setEditItemId(Id);
  };

  const editTodoItem = (newTodo: TodoItemType) => {
    setTodoList((todoList) =>
      todoList.map((item) => {
        if (item.id !== newTodo.id) return item;
        else return newTodo;
      }),
    );
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

  const moveUpItem = (itemToMove: TodoItemType) => {
    const index = todoList.findIndex((item) => item.id === itemToMove.id);

    if (
      index === 0 ||
      index === undefined ||
      todoList[index].status !== todoList[index - 1].status
    ) {
      return;
    }

    const newTodoList = [...todoList];
    [newTodoList[index - 1], newTodoList[index]] = [
      newTodoList[index],
      newTodoList[index - 1],
    ];
    setTodoList(newTodoList);
  };

  const moveDownItem = (itemToMove: TodoItemType) => {
    const index = todoList.findIndex((item) => item.id === itemToMove.id);

    if (
      index === todoList.length ||
      index === undefined ||
      todoList[index].status !== todoList[index + 1].status
    )
      return;

    console.log("move down!");

    const newTodoList = [...todoList];
    [newTodoList[index + 1], newTodoList[index]] = [
      newTodoList[index],
      newTodoList[index + 1],
    ];
    setTodoList(newTodoList);
  };

  return (
    <>
      <Filter />

      <button
        className="flex cursor-pointer items-center justify-center self-start rounded-full bg-green-600 text-gray-100 shadow-2xl transition-all duration-300 hover:bg-green-200 hover:text-green-700"
        onClick={AddTodoItem}
      >
        <HiMiniPlus size={24} />
      </button>

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
                  moveUpItem={moveUpItem}
                  moveDownItem={moveDownItem}
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </Modal>
    </>
  );
}

export default TodoListContainer;
