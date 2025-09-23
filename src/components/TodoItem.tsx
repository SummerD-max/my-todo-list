import type { TodoItem as TodoItemType } from "../types";
import TodoActions from "./TodoActions";
import TodoCheckbox from "./TodoCheckbox";
import TodoName from "./TodoName";
import TodoStatus from "./TodoStatus";

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
  function handleTick() {
    editTodoItem({
      ...item,
      status: item.status === "done" ? "doing" : "done",
    });
  }

  return (
    <div className="grid grid-cols-12 items-center gap-1 py-2 sm:gap-2">
      <TodoCheckbox status={item.status} onTick={handleTick} />
      <TodoStatus status={item.status} />
      <TodoName
        item={item}
        isEditing={beEdited}
        onToggleEdit={toggleEdit}
        onEdit={editTodoItem}
        onDelete={deleteTodoItem}
      />
      <TodoActions
        item={item}
        onEdit={editTodoItem}
        onDelete={deleteTodoItem}
        onMoveUp={moveUpItem}
        onMoveDown={moveDownItem}
      />
    </div>
  );
}

export default TodoItem;
