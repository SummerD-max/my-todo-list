import { format } from "date-fns";
import { HiClock } from "react-icons/hi2";

type DetailDisplayProps = {
  detail: string;
  reminderTime: Date | null;
  setIsEdit: (isEdit: boolean) => void;
};

function DetailDisplay({
  detail,
  reminderTime,
  setIsEdit,
}: DetailDisplayProps) {
  return (
    <>
      <div className="flex items-center justify-center gap-7">
        <div className="flex-1 text-center text-xl font-semibold break-all text-gray-950 dark:text-white">
          {detail ? detail : "No details provided."}
        </div>
        <button
          className="flex-none cursor-pointer rounded-sm border-2 border-green-700 px-3 py-1 font-semibold text-green-700 uppercase transition-colors duration-300 hover:bg-green-700 hover:text-green-50"
          onClick={() => {
            setIsEdit(true);
          }}
        >
          Edit
        </button>
      </div>

      {/* Remind info */}
      {reminderTime && (
        <div className="mt-8 flex items-center justify-center gap-2 text-sm font-semibold text-gray-800">
          <HiClock />
          <span>
            I Will remind you at <br />
          </span>
          <span className="text-green-800">
            {format(new Date(reminderTime), "yyyy/MM/dd HH:mm")}
          </span>
        </div>
      )}
    </>
  );
}

export default DetailDisplay;
