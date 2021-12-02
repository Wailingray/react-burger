import { React } from "react";
import PropTypes from "prop-types";
import styles from "./modal-overlay.module.css";

const ModalOverlay = ({ onClose }) => {
  const closeModalOnClick = () => {
    onClose();
  };

  return <div onClick={closeModalOnClick} className={styles.overlay}></div>;
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
