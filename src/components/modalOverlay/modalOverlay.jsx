import React from "react";
import { createPortal } from "react-dom";
import styles from './modalOverlay.module.css'
import PropTypes from 'prop-types';

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

ModalOverlay.propTypes = {
  modalRef: PropTypes.element.isRequired,
  children: PropTypes.node.isRequired,
}

export default ModalOverlay
