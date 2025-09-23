interface ConfirmDeleteProps {
  deleteFn: () => void;
  closeModal?: () => void;
}

function ConfirmDelete({ deleteFn, closeModal }: ConfirmDeleteProps) {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-xl">Are you sure to delete this todo?</p>
      <div className="flex justify-end gap-2">
        <button
          onClick={deleteFn}
          className="cursor-pointer rounded-2xl bg-red-200 px-4 py-2 text-red-500 transition-all duration-300 hover:bg-red-500 hover:text-red-50"
        >
          Delete
        </button>
        <button
          onClick={closeModal}
          className="cursor-pointer rounded-2xl px-4 py-2 transition-all duration-300 hover:inset-ring-2 hover:inset-ring-green-500/50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
