import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const BaseModal = ({ children, modalActive = false, closeModal }) => {
  return createPortal(
    <AnimatePresence>
      {modalActive && (
        <motion.div className="absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8"
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.52, 0.02, 0.19, 1.02] }}
        >
          <motion.div className="p-4 bg-white self-start mt-32 max-w-screen-md"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: [0.52, 0.02, 0.19, 1.02] }}
          >
            {children}
            <button className="text-white mt-8 bg-weather-primary py-2 px-6" onClick={closeModal}>Close</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  , document.body);
};

export default BaseModal;