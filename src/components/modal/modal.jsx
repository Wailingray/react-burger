import { React, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import { createPortal } from "react-dom";
import ModalOverlay from "../modalOverlay/modalOverlay";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const Modal = ({ isOpened, children, onClose }) => {

  const overlayRef = useRef(null);

  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: isOpened ? 1 : 0,
  })



  if (!isOpened) {
    return null;
  } else
    return createPortal(
      <>
      <ModalOverlay overlayRef={overlayRef} onClose={onClose}/>
      <animated.div style={animation}>
        <div className={styles.modal}>
        <button onClick={onClose} className={`${styles.button} mr-10 mt-15`}>
          <CloseIcon type="primary" />
        </button>
        {children}
        </div>
      </animated.div>
      </>,
      document.getElementById("modal")
    );
};

Modal.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default Modal;
