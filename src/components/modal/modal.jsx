import { React, useEffect } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import ModalOverlay from "../modalOverlay/modalOverlay";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const Modal = ({ children, onClose }) => {

  useEffect(() => {
    const closeModalOnEsc = (e) => {
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
    document.getElementById("modal")
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
