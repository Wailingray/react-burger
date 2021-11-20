import React from "react";
import doneImage from "../../images/done.svg";
import styles from "./order-details.module.css"

const OrderDetails = () => {
  return(
  <>
    <span className={`${styles.digits} text text_type_digits-large mt-30`}>
      1237890
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
}
export default OrderDetails
