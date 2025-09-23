function TodoSummary() {
  return (
    <div className="col-span-5 cursor-pointer flex-col items-center justify-between rounded-sm text-sm sm:col-span-6 sm:flex-row sm:text-base">
      {/* Display */}
      {!beEdited && (
        <div
          onClick={toggleEdit}
          className="text-sm font-semibold sm:text-base"
        >
          {name ? (
            <div className="text-green-700">{name}</div>
          ) : (
            <div className="text-gray-300">Click here to edit your todo</div>
          )}
        </div>
      )}

      {/* Edit */}
      {beEdited && (
        <input
          type="text"
          defaultValue={name}
          placeholder="Type what you are going to do"
          className="w-full rounded-sm font-semibold text-green-700 inset-ring-1 ring-green-600 outline-none"
          ref={inputRef}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />
      )}

      {reminderTime && (
        <div className="flex items-center gap-2 text-xs font-semibold text-green-700">
          <HiClock />
          <span>{format(new Date(reminderTime), "yyyy/MM/dd HH:mm")}</span>
        </div>
      )}
    </div>
  );
}

export default TodoSummary;
