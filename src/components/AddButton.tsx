import { HiMiniPlus } from "react-icons/hi2";
import type { TodoItem } from "../types";
import { HiArrowLeft } from "react-icons/hi";

type AddButtonProps = {
  AddTodoItem: () => void;
  todoList: TodoItem[];
};

function AddButton({ AddTodoItem, todoList }: AddButtonProps) {
  return (
    <div className="flex gap-2">
      <button
        className="flex cursor-pointer items-center justify-center self-start rounded-full bg-green-600 text-gray-100 shadow-2xl transition-all duration-300 hover:bg-green-200 hover:text-green-700"
        onClick={AddTodoItem}
      >
        <HiMiniPlus size={24} />
      </button>
      {todoList.length === 0 && (
        <div className="flex items-center">
          <HiArrowLeft />
          <span className="uppercase">Add todos here</span>
        </div>
      )}
    </div>
  );
}

export default AddButton;
