import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { useAppSelector } from "../../services/hooks/hooks";
import { OrderCardProps } from "../../services/utils/interfaces";
import { TIngredient } from "../../services/utils/types";
import { parseTime } from "../../services/utils/utils";
import styles from "./order-card.module.css";

export const OrderCard: React.FC<OrderCardProps> = ({
  number,
  time,
  name,
  ingredients,
}) => {
  const { ingredientItems } = useAppSelector((state) => state.ingredients);

  const objectsArray: TIngredient[] = [];

  ingredients.map((ingID) => {
    ingredientItems.forEach((item) => {
      if (ingID === item._id) objectsArray.push(item);
    });
  });

  const counter = objectsArray.length - 6;
  const date = parseTime(time);
  const totalPrice = objectsArray.reduce((sum, el) => sum + el.price, 0);

  const renderPictures = (item: TIngredient, idx: number) => {
    if (idx <= 5)
      return (
        <li key={idx} className={styles.listItem} style={{ zIndex: -idx }}>
          <img className={styles.picture} src={item.image_mobile}></img>
        </li>
      );
    else {
      return null;
    }
  };

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.metadata}`}>
        <p className={`text text_type_digits-default`}>{`#${number}`}</p>
        <p className={`text text_type_main-default text_color_inactive`}>
          {date}
        </p>
      </div>
      <p className={`text text_type_main-medium`}>{name}</p>
      <div className={`${styles.orderData}`}>
        <ul className={`${styles.ingredients}`}>
          {objectsArray.map(renderPictures)}
          {counter > 0 && (
            <div className={`${styles.counter} text text_type_main-small`}>
              +{counter}
            </div>
          )}
        </ul>
        <div className={`${styles.priceContainer}`}>
          <p className={`${styles.price}text text_type_digits-default`}>
            {totalPrice}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
