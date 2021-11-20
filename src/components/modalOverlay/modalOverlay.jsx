import { React, useEffect } from "react";
import styles from './modal-overlay.module.css'
import PropTypes from 'prop-types';

const ModalOverlay = ({onClose}) => {

  useEffect(() => {

    const closeModalOnClick = () => {
      onClose()
    }

    document.addEventListener('click', closeModalOnClick);

    return () => {
      document.removeEventListener('click', closeModalOnClick);
    }
  }, [onClose])

  return (
      <div onClose={onClose} className={styles.overlay}>
      </div>
  )
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default ModalOverlay
