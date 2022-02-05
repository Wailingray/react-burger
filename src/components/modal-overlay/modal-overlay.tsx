import React from "react";
import styles from "./modal-overlay.module.css";
import { ModalProps } from "../../services/utils/interfaces";

const ModalOverlay: React.FC<ModalProps> = ({ onClose }) => {
  const closeModalOnClick = () => {
    onClose();
  };
  return <div onClick={closeModalOnClick} className={styles.overlay}></div>;
};

export default ModalOverlay;
