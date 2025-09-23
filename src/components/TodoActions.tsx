import { HiArrowDown, HiArrowUp, HiEye, HiTrash } from "react-icons/hi2";
import type { TodoItem as TodoItemType } from "../types";
import ConfirmDelete from "./ConfirmDelete";
import Modal from "./Modal";
import TodoDetail from "./TodoDetail";

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
    <div className="col-span-3 flex items-center justify-end gap-2">
      {/* Details Modal */}
      <Modal>
        <Modal.Open id={`${item.id}-details`}>
          <button className="text-lime-500 underline transition-all hover:text-lime-600 hover:no-underline">
            <HiEye />
          </button>
        </Modal.Open>
        <Modal.Window id={`${item.id}-details`}>
          <TodoDetail item={item} editTodoItem={onEdit} />
        </Modal.Window>

        {/* Delete Modal */}
        <Modal.Open id={`${item.id}-confirmDelete`}>
          <button className="text-red-400 transition-all hover:text-red-600">
            <HiTrash />
          </button>
        </Modal.Open>
        <Modal.Window id={`${item.id}-confirmDelete`}>
          <ConfirmDelete deleteFn={() => onDelete(item)} />
        </Modal.Window>
      </Modal>

      {/* Move Buttons */}
      <div className="flex flex-col gap-1">
        <button
          onClick={() => onMoveUp(item)}
          className="rounded-sm bg-green-700 p-0.5 text-white transition-all hover:bg-green-600"
        >
          <HiArrowUp size={16} />
        </button>
        <button
          onClick={() => onMoveDown(item)}
          className="rounded-sm bg-green-700 p-0.5 text-white transition-all hover:bg-green-600"
        >
          <HiArrowDown size={16} />
        </button>
      </div>
    </div>
  );
}

export default TodoActions;
