type TodoStatusProps = {
  status: "doing" | "done";
};

function TodoStatus({ status }: TodoStatusProps) {
  const style =
    status === "done"
      ? "bg-green-500 text-green-100 dark:bg-green-800/50 dark:text-green-400"
      : "bg-red-100 text-red-500 dark:bg-red-800/50 dark:text-red-400";

  return (
    <div
      className={`col-span-2 cursor-pointer rounded-full text-center text-xs font-semibold uppercase transition-all duration-300 hover:-translate-y-1 ${style} sm:px-4 sm:py-2`}
    >
      <span>{status}</span>
    </div>
  );
}

export default TodoStatus;
