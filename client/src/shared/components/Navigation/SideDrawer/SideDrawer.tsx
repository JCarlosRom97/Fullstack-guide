import './SideDrawer.css'
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

const SideDrawer = ({ show, children, onClick }) => {
  return createPortal(
    <AnimatePresence>
      {show && (
        <motion.aside
          className="side-drawer"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.2 }}
          onClick={onClick}
        >
          {children}
        </motion.aside>
      )}
    </AnimatePresence>,
    document.getElementById("drawer-hook")
  );
};

export default SideDrawer;