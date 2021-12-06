import React, {useMemo} from "react";
import { useSelector } from "react-redux";
import doneImage from "../../images/done.svg";
import PropTypes from "prop-types";
import styles from "./order-details.module.css"

const OrderDetails = () => {

  const { order, SUBMIT_ORDER_REQUEST, SUBMIT_ORDER_FAILED } = useSelector(state => state.order);

  const content = useMemo(
    () => {
      return SUBMIT_ORDER_REQUEST ? (
        <p className={`${styles.message} text text_type_main-large`}>
        Загрузка...
      </p>
      ) : (
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
    },
    [SUBMIT_ORDER_REQUEST, order]
  );

  if(SUBMIT_ORDER_FAILED) return (
    <>
    <span className={`${styles.digits} text text_type_digits-large mt-30`}>
      ----
    </span>
    <p className="text text_type_main-medium mt-8 mb-8">Что-то пошло не так!</p>
    <p className="text text_type_main-medium mb-2">
      Возникла ошибка
    </p>
    <p className="text text_type_main-medium text_color_inactive mb-30">
      Пожалуйста, попробуйте ещё раз позднее
    </p>
  </>
  )
  else return content
}


export default OrderDetails
