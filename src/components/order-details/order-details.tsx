import React from "react";
import { useAppSelector } from "../../services/hooks/hooks";
import doneImage from "../../images/done.svg";
import styles from "./order-details.module.css";

const OrderDetails: React.FC = () => {
  const { order, submitOrderSuccess, submitOrderError } = useAppSelector(
    (state) => state.order
  );

  if (submitOrderSuccess && order !== null) {
    return (
      <>
        <span className={`${styles.digits} text text_type_digits-large mt-30`}>
          {order.order.number}
        </span>
        <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
        <img className="mt-15 mb-15" src={doneImage} alt="Done!" />
        <p className="text text_type_main-medium mb-2">
          Ваш заказ начали готовить
        </p>
        <p className="text text_type_main-medium text_color_inactive mb-30">
          Дождитесь готовности на орбитальной станции
        </p>
      </>
    );
  } else
    return (
      <>
        <span className={`${styles.digits} text text_type_digits-large mt-30`}>
          ----
        </span>
        <p className="text text_type_main-medium mt-8 mb-8">
          Что-то пошло не так!
        </p>
        <p className="text text_type_main-medium mb-2">
          Возникла ошибка! Код ошибки: {submitOrderError}
        </p>
        <p className="text text_type_main-medium text_color_inactive mb-30">
          Пожалуйста, попробуйте ещё раз позднее
        </p>
      </>
    );
};

export default OrderDetails;
