import { React, useEffect, useRef } from "react";
import styles from './modal-overlay.module.css'
import PropTypes from 'prop-types';

const ModalOverlay = ({onClose}) => {

  const overlayRef = useRef(null);

  useEffect(() => {
    const closeModalOnEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }

    const closeModalOnClick = (e) => {
      if (e.target === overlayRef.current) onClose()
    }

    document.addEventListener('keydown', closeModalOnEsc);
    document.addEventListener('click', closeModalOnClick);

    return () => {
      document.removeEventListener('keydown', closeModalOnEsc);
      document.removeEventListener('click', closeModalOnClick);
    }
  }, [onClose])

  return (
      <div ref={overlayRef} onClose={onClose} className={styles.overlay}>
      </div>
  )
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default ModalOverlay
