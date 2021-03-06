import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalProps } from "../../services/utils/interfaces";

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  useEffect(() => {
    const closeModalOnEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", closeModalOnEsc);

    return () => {
      document.removeEventListener("keydown", closeModalOnEsc);
    };
  }, [onClose]);

  return createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={styles.modal}>
        <button onClick={onClose} className={`${styles.button} mr-10 mt-15`}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </>,
    document.getElementById("modal")!
  );
};

export default Modal;
