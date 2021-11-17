import React from "react";
import { createPortal } from "react-dom";
import styles from './modalOverlay.module.css'

const ModalOverlay = (props) => {
  return (
    createPortal(
      <div ref={props.modalRef} className={styles.overlay}>
        {props.children}
      </div>,
      document.getElementById('modal')
    )
  )
}

export default ModalOverlay
