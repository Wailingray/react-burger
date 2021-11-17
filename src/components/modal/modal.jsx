import React from "react";
import { createPortal } from "react-dom";
import ModalOverlay from "../modalOverlay/modalOverlay";
import styles from "./modal.module.css";
import doneImage from "../../images/done.svg";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const Modal = ({ isOpened, children }) => {
  if (!isOpened) {
    return null;
  } else
    return createPortal(
      <ModalOverlay>
        <div className={styles.modal}>
        <button className={styles.button}>
          <CloseIcon type="primary" />
        </button>

          <span className={`${styles.digits} text text_type_digits-large mt-30`}>
            1237890
          </span>
          <p className="text text_type_main-medium mt-8">
            идентификатор заказа
          </p>
          <img className="mt-15 mb-15" src={doneImage} alt="Done!" />
          <p className="text text_type_main-medium mb-2">
            Ваш заказ начали готовить
          </p>
          <p className="text text_type_main-medium text_color_inactive">
            Дождитесь готовности на орбитальной станции
          </p>
        </div>
      </ModalOverlay>,
      document.getElementById("modal")
    );
};

export default Modal;
