import { useState } from "react";
import type { TodoItem as TodoItemType } from "../types";
import DatePicker from "react-datepicker";
// 1. 在这里导入 DatePicker 的 CSS
import { HiClock } from "react-icons/hi2";
import { format } from "date-fns";
import DetailDisplay from "./DetailDisplay";
import DetailEdit from "./DetailEdit";

interface TodoDetailProps {
  item: TodoItemType;
  editTodoItem: (newItem: TodoItemType) => void;
}

function TodoDetail({ item, editTodoItem }: TodoDetailProps) {
  const { detail, reminderTime } = item;

  const [isEdit, setIsEdit] = useState(detail === "");

  function saveDetail(newDetail: string, newReminderTime: Date | null) {
    editTodoItem({ ...item, detail: newDetail, reminderTime: newReminderTime });
    setIsEdit(false);
  }

  return (
    <div className="w-full">
      {!isEdit && (
        <DetailDisplay
          detail={detail}
          reminderTime={reminderTime || null}
          setIsEdit={setIsEdit}
        />
      )}
      {isEdit && (
        <DetailEdit
          detail={detail}
          reminderTime={reminderTime || null}
          saveDetail={saveDetail}
        />
      )}
    </div>
  );
}

export default TodoDetail;
