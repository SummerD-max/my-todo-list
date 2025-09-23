import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import TodoListContainer from "../components/TodoListContainer";
import { useDarkMode } from "../contexts/DarkModeContext";

function MainApp() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div
      className={`relative container mx-auto my-5 flex h-dvh flex-col items-center`}
    >
      <button
        className={`absolute top-2 right-2 cursor-pointer ${isDarkMode ? "text-gray-600" : "text-yellow-400"} transition-colors duration-500`}
        onClick={toggleDarkMode}
      >
        {isDarkMode ? <HiOutlineMoon size={32} /> : <HiOutlineSun size={32} />}
      </button>
      <header className="mb-2 flex flex-col items-center gap-1">
        <div className="text-4xl font-bold">My todo list</div>
        <div className="text-sm text-gray-500">
          Manage your tasks efficiently
        </div>
      </header>

      <main className="mt-4 w-full max-w-3xl px-3">
        <TodoListContainer />
      </main>
    </div>
  );
}

export default MainApp;
