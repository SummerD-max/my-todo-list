import { createContext, useContext, useEffect, useRef, useState } from "react";
import { HiBars3 } from "react-icons/hi2";

type MenuContextType = {
  openMenuId: string;
  setOpenMenuId: (id: string) => void;
  position: { x: number; y: number };
  setPosition: (pos: { x: number; y: number }) => void;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

function Menu({ children }: { children: React.ReactNode }) {
  const [openMenuId, setOpenMenuId] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <MenuContext.Provider
      value={{ openMenuId, setOpenMenuId, position, setPosition }}
    >
      {children}
    </MenuContext.Provider>
  );
}

function Toggle({ id }: { id: string }) {
  const context = useContext(MenuContext);
  if (!context) throw new Error("Toggle must be used within Menu");
  const { openMenuId, setOpenMenuId, setPosition } = context;

  const isOpen = openMenuId === id;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setOpenMenuId(isOpen ? "" : id);
        const rect = e.currentTarget.getBoundingClientRect();
        setPosition({ x: rect.left, y: rect.bottom });
      }}
      className="cursor-pointer rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
    >
      <HiBars3 size={24} />
    </div>
  );
}

function MenuList({ id, children }: { id: string; children: React.ReactNode }) {
  const context = useContext(MenuContext);
  if (!context) throw new Error("MenuList must be used within Menu");
  const { openMenuId, setOpenMenuId, position } = context;

  const ref = useRef<HTMLUListElement>(null);

  // 1. 判断当前菜单是否应该打开
  const isOpen = openMenuId === id;

  useEffect(
    function () {
      if (openMenuId === id) {
        function handleClickOutside(event: MouseEvent) {
          if (ref.current && !ref.current.contains(event.target as Node)) {
            setOpenMenuId("");
          }
        }

        document.addEventListener("click", handleClickOutside);
        return () => {
          document.removeEventListener("click", handleClickOutside);
        };
      }
    },
    [openMenuId, id, setOpenMenuId],
  );

  if (!position.x && !position.y) return null;

  return (
    <ul
      className={`divide-gray-200 ${isOpen ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"} absolute w-48 divide-y-1 rounded-xl bg-gray-100 px-4 py-2 shadow-lg transition-transform duration-150 ease-in-out dark:divide-white/50 dark:bg-gray-800`}
      style={{
        top: position.y,
        left: position.x,
        transform: "translateX(-100%)",
      }}
      ref={ref}
      onClick={() => {
        console.log("click menu");
        setOpenMenuId("");
      }}
    >
      {children}
    </ul>
  );
}

function MenuButton({
  children,
  onClick,
  type,
}: {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLLIElement>) => void;
  type: "primary" | "danger";
}) {
  const context = useContext(MenuContext);
  if (!context) throw new Error("MenuButton must be used within Menu");
  const { setOpenMenuId } = context;

  return (
    <li
      onClick={(e) => {
        onClick?.(e);
        setOpenMenuId("");
      }}
      className="py-2"
    >
      <button
        className={`flex cursor-pointer gap-2 text-left transition-all ${
          type === "primary"
            ? "text-lime-500 hover:text-lime-600"
            : "text-red-400 hover:text-red-600"
        }`}
      >
        {children}
      </button>
    </li>
  );
}

Menu.Toggle = Toggle;
Menu.List = MenuList;
Menu.Button = MenuButton;
export default Menu;
