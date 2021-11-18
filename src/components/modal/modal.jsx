import { React, useEffect, useRef } from "react";
import { useSpring, animated } from 'react-spring';
import { createPortal } from "react-dom";
import ModalOverlay from "../modalOverlay/modalOverlay";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const Modal = ({ isOpened, children, onClose }) => {

  const modalRef = useRef(null)

  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: isOpened ? 1 : 0,
  })

  const closeModalOnEsc = (e) => {
    if (e.key === 'Escape') onClose()
  }

  const closeModalOnClick = (e) => {
    if (e.target === modalRef.current) onClose()
  }

  useEffect(() => {
    document.addEventListener('keydown', closeModalOnEsc);
    document.addEventListener('click', closeModalOnClick);

    return () => {
      document.removeEventListener('keydown', closeModalOnEsc);
      document.removeEventListener('click', closeModalOnClick);
    }

  }, [])


  if (!isOpened) {
    return null;
  } else
    return createPortal(
      <ModalOverlay modalRef={modalRef}>
        <animated.div style={animation}>
        <div className={styles.modal}>
        <button onClick={onClose} className={`${styles.button} mr-10 mt-15`}>
          <CloseIcon type="primary" />
        </button>
        {children}
        </div>
        </animated.div>
      </ModalOverlay>,
      document.getElementById("modal")
    );
};

export default Modal;
