import { React, useEffect } from "react";
import styles from './modal-overlay.module.css'
import PropTypes from 'prop-types';

const ModalOverlay = (props) => {



  useEffect((props) => {
    const closeModalOnEsc = (e) => {
      if (e.key === 'Escape') props.onClose()
    }

    const closeModalOnClick = (e) => {
      if (e.target === props.overlayRef.current) props.onClose()
    }

    document.addEventListener('keydown', closeModalOnEsc);
    document.addEventListener('click', closeModalOnClick);

    return () => {
      document.removeEventListener('keydown', closeModalOnEsc);
      document.removeEventListener('click', closeModalOnClick);
    }
  }, [props.onClose])

  return (
      <div ref={props.overlayRef} onClose={props.onClose} className={styles.overlay}>
      </div>
  )
}

ModalOverlay.propTypes = {
  overlayRef: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default ModalOverlay
