import DatePicker from "react-datepicker";
import { HiClock } from "react-icons/hi2";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

type DetailEditProps = {
  detail: string;
  reminderTime: Date | null;
  saveDetail: (newDetail: string, newReminderTime: Date | null) => void;
};

function DetailEdit({ detail, reminderTime, saveDetail }: DetailEditProps) {
  // 本地状态保存 textarea 的输入
  const [newDetail, setNewDetail] = useState(detail);
  const [newReminderTime, setNewReminderTime] = useState<Date | null>(
    reminderTime || null,
  );

  return (
    <div className="flex h-full flex-col gap-3">
      {/* detail */}
      <textarea
        className="min-h-40 w-full resize-none rounded-2xl border-2 border-green-600 bg-white px-4 py-2 text-green-900 placeholder:text-gray-400 focus:outline-none dark:bg-gray-800 dark:text-green-400 dark:placeholder:text-gray-400"
        placeholder="Add more details here~ Press 'Enter' to save"
        value={newDetail}
        onChange={(e) => setNewDetail(e.target.value)}
      />

      {/* set reminder time - 使用 relative 容器包裹图标和 DatePicker */}
      <div className="relative flex items-center">
        <HiClock className="pointer-events-none absolute left-4 z-10 h-5 w-5 text-gray-400" />
        <DatePicker
          withPortal
          selected={newReminderTime}
          onChange={(date) => setNewReminderTime(date)}
          showTimeSelect
          dateFormat="yyyy/MM/dd HH:mm"
          placeholderText="Set a reminder time"
          className="w-full cursor-pointer rounded-2xl border-2 border-green-600 bg-transparent py-2 pr-4 pl-11 text-sm text-gray-700 transition-colors duration-300 hover:border-green-400 focus:outline-none dark:bg-gray-800 dark:text-green-400 dark:placeholder:text-gray-200 dark:hover:border-green-400"
          // --- 使用 !important 强制覆盖背景色 ---

          // 整个日历容器 (添加了 ! 前缀)
          calendarClassName="!bg-green-50 "
        />
      </div>

      <button
        className="ml-3 cursor-pointer self-end rounded-sm border-2 border-green-700 px-3 py-1 font-semibold text-green-700 uppercase transition-colors duration-300 hover:bg-green-700 hover:text-white dark:border-green-400 dark:hover:bg-green-400 dark:hover:text-gray-900"
        onClick={() => saveDetail(newDetail, newReminderTime)}
      >
        Save
      </button>
    </div>
  );
}

export default DetailEdit;
