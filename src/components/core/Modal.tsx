import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect, useRef } from "react";

const VARIANT = {
  left: "justify-end max-h-screen ",
  center: "justify-center items-center",
};

const HEIGHT = {
  left: "h-screen",
  center: "h-auto",
};

interface ModalProps {
  showModal: boolean;
  setShowModal: any;
  children: ReactNode;
  variant?: keyof typeof VARIANT;
}

export default function Modal({
  children,
  showModal,
  setShowModal,
  variant = "left",
}: ModalProps) {
  const divRef = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (divRef?.current && !divRef?.current?.contains(event.target)) {
        setShowModal && setShowModal();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [setShowModal]);

  const initialAnimation =
    variant === "left" ? { opacity: 0, x: "100%" } : { opacity: 0, scale: 0.5 };
  const animation =
    variant === "left" ? { opacity: 1, x: 0 } : { opacity: 1, scale: 1 };
  const exitAnimation =
    variant === "left" ? { opacity: 0, x: "100%" } : { opacity: 0, scale: 0.8 };

  const animationVariants = {
    initial: initialAnimation,
    animate: animation,
    exit: exitAnimation,
  };

  return (
    <>
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={` absolute inset-0 z-50 flex w-full  overflow-hidden bg-gray-300 backdrop-blur-sm ${VARIANT[variant]}  bg-opacity-70 `}
            // onClick={() => setShowModal(false)}
          >
            <motion.div
              variants={animationVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={
                variant === "left"
                  ? { type: "ease", duration: 0.5 }
                  : { opacity: 0, scale: 0.2 }
              }
              className={`absolute w-[70%] pb-8 lg:w-[40%]`}
            >
              <div className={`relative ${HEIGHT[variant]} `} ref={divRef}>
                {children}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
