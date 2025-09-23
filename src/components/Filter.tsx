import { useSearchParams } from "react-router";

function Filter() {
  const [URLSearchParams, SetURLSearchParams] = useSearchParams();
  const currentFilter = URLSearchParams.get("status") || "all";

  function handleClick(value: string) {
    if (currentFilter === value) return;
    URLSearchParams.set("status", value);
    SetURLSearchParams(URLSearchParams);
  }

  return (
    // Filter
    <div className="flex justify-center sm:justify-end">
      <div className="transiton-all flex justify-end gap-2 rounded-xl px-2 py-1 ring-2 ring-green-600/50 duration-200 hover:ring-3">
        <button
          className={`cursor-pointer rounded-sm px-3 py-1 font-semibold transition-all duration-300 hover:bg-yellow-500 disabled:cursor-not-allowed ${currentFilter === "all" ? "bg-yellow-500" : ""}`}
          onClick={() => handleClick("all")}
          disabled={currentFilter === "all"}
        >
          All
        </button>
        <button
          className={`cursor-pointer rounded-sm px-3 py-1 font-semibold transition-all duration-300 hover:bg-red-400 disabled:cursor-not-allowed ${currentFilter === "doing" ? "bg-red-400" : ""}`}
          onClick={() => handleClick("doing")}
          disabled={currentFilter === "doing"}
        >
          Doing
        </button>
        <button
          className={`cursor-pointer rounded-sm px-3 py-1 font-semibold transition-all duration-300 hover:bg-green-500 disabled:cursor-not-allowed ${currentFilter === "done" ? "bg-green-500" : ""}`}
          onClick={() => handleClick("done")}
          disabled={currentFilter === "done"}
        >
          Done
        </button>
      </div>
    </div>
  );
}

export default Filter;
