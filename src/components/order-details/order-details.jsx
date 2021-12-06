import React from "react";
import { useSelector } from "react-redux";
import doneImage from "../../images/done.svg";
import PropTypes from "prop-types";
import styles from "./order-details.module.css"

const OrderDetails = () => {

  const { order } = useSelector(state => state.order);

  if (order.order.number) (
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
  )
  else return (
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
}


export default OrderDetails
