import React, { CSSProperties, ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

import Backdrop from "../Backdrop/Backdrop";
import "./Modal.css";

interface ModalProps {
  show: boolean;
  onCancel: () => void;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
  headerClass?: string;
  contentClass?: string;
  footerClass?: string;
  style?: CSSProperties;
}

const Modal: React.FC<ModalProps> = ({
  show,
  onCancel,
  onSubmit,
  header,
  footer,
  children,
  className = "",
  headerClass = "",
  contentClass = "",
  footerClass = "",
  style,
}) => {
  const modalRoot = document.getElementById("modal-hook");

  useEffect(() => {
    if (!show) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [show, onCancel]);

  if (!modalRoot) return null;

  const body = (
    <>
      <div className={`modal__content ${contentClass}`.trim()}>
        {children}
      </div>

      {footer && (
        <footer className={`modal__footer ${footerClass}`.trim()}>
          {footer}
        </footer>
      )}
    </>
  );

  return createPortal(
    <AnimatePresence>
      {show && (
        <>
          <Backdrop onClick={onCancel} />

          <motion.aside
            role="dialog"
            aria-modal="true"
            className={`modal ${className}`.trim()}
            style={style}
            initial={{ opacity: 0, y: -25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -25, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {header && (
              <header className={`modal__header ${headerClass}`.trim()}>
                {typeof header === "string" ? <h2>{header}</h2> : header}
              </header>
            )}

            {onSubmit ? (
              <form onSubmit={onSubmit}>
                {body}
              </form>
            ) : (
              body
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    modalRoot
  );
};

export default Modal;