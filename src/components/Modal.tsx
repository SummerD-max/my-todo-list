import React, {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { HiX } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";

// 定义 Context 的类型
interface ModalContextType {
  id: string;
  setId: (id: string) => void;
  close: () => void;
}

const ModalContext = createContext<ModalContextType>({
  id: "",
  setId: () => {},
  close: () => {},
});

// 定义 Modal 组件的 props 类型
interface ModalProps {
  children: ReactNode;
}

function Modal({ children }: ModalProps) {
  const [id, setId] = useState("");

  const close = () => {
    console.log("close");
    setId("");
  };

  return (
    <ModalContext.Provider value={{ id, setId, close }}>
      {children}
    </ModalContext.Provider>
  );
}

interface OpenProps {
  id: string;
  children: ReactElement;
}

function Open({ id, children }: OpenProps) {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Open must be used within Modal");

  const { id: currentOpenId, setId } = context;

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (id === "" || currentOpenId !== id) {
      setId(id);
    }
  };

  // 2. 验证 children 是一个有效的 React 元素
  if (!React.isValidElement(children)) {
    return children;
  }

  // 3. cloneElement 时，将 children 断言为可以接受 onClick 的类型
  return cloneElement(
    children as React.ReactElement<{ onClick: React.MouseEventHandler }>,
    {
      onClick: handleOpen,
    },
  );
}

interface WindowProps {
  id: string;
  children: ReactElement;
}

function Window({ id, children }: WindowProps) {
  const { id: openId, close } = useContext(ModalContext)!;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (openId !== id) return;
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener("click", onClickOutside);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
    return () => {
      document.removeEventListener("click", onClickOutside);
    };
  }, [openId, id, close]);

  return createPortal(
    <AnimatePresence>
      {openId === id && (
        // 蒙层 + 居中容器
        <motion.div
          key="backdrop"
          className="fixed inset-0 flex items-center justify-center bg-white/10 backdrop-blur-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* 弹窗主体 */}
          <motion.div
            key="modal"
            ref={ref}
            onClick={(e) => e.stopPropagation()}
            className="relative flex h-[70vh] w-5/6 max-w-lg flex-col rounded-2xl border-2 border-green-100 bg-green-100/50 p-4 text-green-700 shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Close X button */}
            <button
              className="absolute top-3 right-3 cursor-pointer text-green-400 hover:text-green-600"
              onClick={close}
            >
              <HiX size={32} />
            </button>

            {/* Children */}
            <div className="mt-5 flex flex-1 items-center justify-center">
              {cloneElement(
                children as ReactElement<{ closeModal?: () => void }>,
                { closeModal: close },
              )}
            </div>

            {/* ESC hint */}
            <div className="p-4 text-center">
              <p className="text-sm text-gray-400">PRESS "ESC" to close</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
