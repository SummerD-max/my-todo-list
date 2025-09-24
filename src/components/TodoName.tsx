import { format } from "date-fns";
import { useEffect, useRef } from "react";
import { HiClock } from "react-icons/hi2";
import type { TodoItem as TodoItemType } from "../types";

type TodoNameProps = {
  item: TodoItemType;
  isEditing: boolean;
  onToggleEdit: () => void;
  onEdit: (item: TodoItemType) => void;
  onDelete: (item: TodoItemType) => void;
};

function TodoName({
  item,
  isEditing,
  onToggleEdit,
  onEdit,
  onDelete,
}: TodoNameProps) {
  const { name, reminderTime } = item;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  function handleSave(value: string) {
    onEdit({ ...item, name: value });
    onToggleEdit();
  }

  if (isEditing) {
    return (
      <div className="col-span-9 sm:col-span-7">
        <input
          ref={inputRef}
          type="text"
          defaultValue={name}
          onBlur={(e) => handleSave(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave(e.currentTarget.value);
            if (e.key === "Escape") onToggleEdit();
          }}
          className="w-full rounded-sm bg-transparent font-semibold text-green-700 ring-1 ring-green-600 outline-none dark:text-green-300"
        />
      </div>
    );
  }

  return (
    <div
      onClick={onToggleEdit}
      className="col-span-9 flex cursor-pointer flex-col justify-center sm:col-span-7"
    >
      <span className="font-semibold text-green-700 dark:text-green-300">
        {name || (
          <span className="text-gray-400">Click here to edit your todo</span>
        )}
      </span>
      {reminderTime && (
        <div className="mt-1 flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
          <HiClock />
          <span>{format(new Date(reminderTime), "yyyy/MM/dd HH:mm")}</span>
        </div>
      )}
    </div>
  );
}

export default TodoName;
