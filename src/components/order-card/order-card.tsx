import React from "react";
import { useAppSelector } from "../../services/hooks/hooks";
import { OrderCardProps } from "../../services/utils/interfaces";
import styles from "./order-card.module.css";

export const OrderCard: React.FC<OrderCardProps> = ({number, time, name, ingredients })  => {

  const {ingredientItems} = useAppSelector((state) => state.ingredients);

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.metadata}`}>
        <p className={`text text_type_digits-default`}>{`#${number}`}</p>
        <p className={`text text_type_main-default text_color_inactive`}>
          {time}
        </p>
      </div>
      <p className={`text text_type_main-medium`}>
        {name}
      </p>
      <div className={`${styles.ingredients}`}></div>
    </div>
  );
};
