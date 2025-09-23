import { HiCheck } from "react-icons/hi";

type TodoCheckboxProps = {
  status: "doing" | "done";
  onTick: () => void;
};

function TodoCheckbox({ status, onTick }: TodoCheckboxProps) {
  return (
    <div
      className="col-span-1 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border-2 border-green-800 dark:border-green-300"
      onClick={onTick}
    >
      {status === "done" && (
        <HiCheck className="font-bold text-green-700 dark:text-green-300" />
      )}
    </div>
  );
}

export default TodoCheckbox;
