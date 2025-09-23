import type React from "react";
import { useEffect, useRef } from "react";
import { HiCheck, HiEye, HiTrash } from "react-icons/hi";
import { HiArrowDown, HiArrowUp, HiClock } from "react-icons/hi2";
import type { TodoItem as TodoItemType } from "../types";
import ConfirmDelete from "./ConfirmDelete";
import Modal from "./Modal";
import TodoDetail from "./TodoDetail";
import { format } from "date-fns";

export interface TodoItemProps {
  item: TodoItemType;
  editTodoItem: (newItem: TodoItemType) => void;
  beEdited: boolean;
  toggleEdit: () => void;
  deleteTodoItem: (itemToDelete: TodoItemType) => void;
  moveUpItem: (item: TodoItemType) => void;
  moveDownItem: (item: TodoItemType) => void;
}

function TodoItem({
  item,
  editTodoItem,
  beEdited,
  toggleEdit,
  deleteTodoItem,
  moveUpItem,
  moveDownItem,
}: TodoItemProps) {
  const { id, name, status, reminderTime } = item;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(
    function () {
      if (beEdited && inputRef.current) {
        inputRef.current.focus();
      }
    },
    [beEdited],
  );

  function handleTick() {
    const newStatus: "done" | "doing" = status === "done" ? "doing" : "done";
    const newItem = {
      ...item,
      status: newStatus,
    };
    editTodoItem(newItem);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const newName = e.currentTarget.value;
      if (newName) {
        const newItem = {
          ...item,
          name: newName,
        };
        editTodoItem(newItem);
        toggleEdit();
      } else {
        deleteTodoItem(item); // 名称为空则删除该条目
      }
    }
    if (e.key === "Escape") {
      toggleEdit(); // 取消编辑
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const newName = e.currentTarget.value.trim();
    if (newName) {
      const newItem = {
        ...item,
        name: newName,
      };
      editTodoItem(newItem);
    } else {
      deleteTodoItem(item); // 名称为空则删除该条目
    }
    toggleEdit(); // 失焦时也退出编辑模式
  }

  return (
    <div className={`grid grid-cols-12 items-center gap-1 py-2 sm:gap-2`}>
      {/* Checkbox */}
      <div
        className="col-span-1 h-5 w-5 cursor-pointer rounded-full border-2 border-green-800"
        onClick={handleTick}
      >
        {status === "done" && <HiCheck className="text-green-700" />}
      </div>

      {/* Status */}
      <div
        className={`col-span-3 cursor-pointer rounded-full text-center text-xs font-semibold uppercase transition-all duration-300 hover:-translate-y-1 sm:col-span-2 ${
          status === "done"
            ? "bg-green-100 text-green-400"
            : "bg-red-100 text-red-400"
        } px-4 py-2`}
      >
        <span>{status}</span>
      </div>

      {/* Name */}
      <div className="col-span-5 cursor-pointer flex-col items-center justify-between rounded-sm text-sm sm:col-span-6 sm:flex-row sm:text-base">
        {/* Display */}
        {!beEdited && (
          <div
            onClick={toggleEdit}
            className="text-sm font-semibold sm:text-base"
          >
            {name ? (
              <div className="text-green-700">{name}</div>
            ) : (
              <div className="text-gray-300">Click here to edit your todo</div>
            )}
          </div>
        )}

        {/* Edit */}
        {beEdited && (
          <input
            type="text"
            defaultValue={name}
            placeholder="Type what you are going to do"
            className="w-full rounded-sm font-semibold text-green-700 inset-ring-1 ring-green-600 outline-none"
            ref={inputRef}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
          />
        )}

        {reminderTime && (
          <div className="flex items-center gap-2 text-xs font-semibold text-green-700">
            <HiClock />
            <span>{format(new Date(reminderTime), "yyyy/MM/dd HH:mm")}</span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="col-span-3 flex gap-2">
        <Modal.Open id={`${id}-details`}>
          <button className="cursor-pointer text-lime-500 underline transition-all duration-300 hover:text-lime-600 hover:no-underline">
            <HiEye />
          </button>
        </Modal.Open>
        <Modal.Window id={`${id}-details`}>
          <TodoDetail item={item} editTodoItem={editTodoItem} />
        </Modal.Window>
        <Modal.Open id={`${id}-confirmDelete`}>
          <button className="cursor-pointer text-red-300 transition-all duration-300 hover:text-red-500">
            <HiTrash />
          </button>
        </Modal.Open>
        <Modal.Window id={`${id}-confirmDelete`}>
          <ConfirmDelete deleteFn={() => deleteTodoItem(item)} />
        </Modal.Window>
        {/* Move up and down operations */}
        <div className="flex flex-col items-center justify-center gap-1">
          <div
            className={`cursor-pointer rounded-sm bg-green-700 p-0.5 font-bold text-white transition-all duration-300 hover:bg-green-600`}
            onClick={() => moveUpItem(item)}
          >
            <HiArrowUp size={16} />
          </div>
          <div
            className={`cursor-pointer rounded-sm bg-green-700 p-0.5 font-bold text-white transition-all duration-300 hover:bg-green-600`}
            onClick={() => moveDownItem(item)}
          >
            <HiArrowDown size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
