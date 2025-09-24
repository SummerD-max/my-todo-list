import { HiArrowDown, HiArrowUp, HiEye, HiTrash } from "react-icons/hi2";
import type { TodoItem as TodoItemType } from "../types";
import ConfirmDelete from "./ConfirmDelete";
import Modal from "./Modal";
import TodoDetail from "./TodoDetail";
import Menu from "./Menu";

type TodoActionsProps = {
  item: TodoItemType;
  onEdit: (item: TodoItemType) => void;
  onDelete: (item: TodoItemType) => void;
  onMoveUp: (item: TodoItemType) => void;
  onMoveDown: (item: TodoItemType) => void;
};

function TodoActions({
  item,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
}: TodoActionsProps) {
  return (
    <div className="flex-end col-span-full flex items-center justify-end gap-2 sm:col-span-2">
      {/* Mobile */}
      <div className="sm:hidden">
        <Menu.Toggle id={`${item.id}-menu`} />
        <Menu.List id={`${item.id}-menu`}>
          <Modal.Open id={`${item.id}-details`}>
            <Menu.Button type="primary">
              <HiEye size={24} />
              <span>View Details</span>
            </Menu.Button>
          </Modal.Open>

          <li className="py-2">
            <Modal.Open id={`${item.id}-confirmDelete`}>
              <Menu.Button type="danger">
                <HiTrash size={24} />
                <span>Delete</span>
              </Menu.Button>
            </Modal.Open>
          </li>
        </Menu.List>
      </div>

      {/* Desktop */}
      {/* Details Modal */}
      <div className="hidden sm:flex sm:items-center sm:gap-2">
        <Modal.Open id={`${item.id}-details`}>
          <button className="cursor-pointer text-lime-500 underline transition-all hover:text-lime-600 hover:no-underline">
            <HiEye size={24} />
          </button>
        </Modal.Open>

        {/* Delete Modal */}
        <Modal.Open id={`${item.id}-confirmDelete`}>
          <button className="cursor-pointer text-red-400 transition-all hover:text-red-600">
            <HiTrash size={24} />
          </button>
        </Modal.Open>

        {/* Move Buttons */}
        <div className="flex flex-col gap-1">
          <button
            onClick={() => onMoveUp(item)}
            className="cursor-pointer rounded-sm bg-green-700 p-0.5 text-white transition-all hover:bg-green-600"
          >
            <HiArrowUp size={18} />
          </button>
          <button
            onClick={() => onMoveDown(item)}
            className="cursor-pointer rounded-sm bg-green-700 p-0.5 text-white transition-all hover:bg-green-600"
          >
            <HiArrowDown size={18} />
          </button>
        </div>
      </div>

      <Modal.Window id={`${item.id}-details`}>
        <TodoDetail item={item} editTodoItem={onEdit} />
      </Modal.Window>
      <Modal.Window id={`${item.id}-confirmDelete`}>
        <ConfirmDelete deleteFn={() => onDelete(item)} />
      </Modal.Window>
    </div>
  );
}

export default TodoActions;
