import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../services/hooks/hooks";
import {
  OrderCardProps,
  TLocationState,
} from "../../services/utils/interfaces";
import { TIngredient } from "../../services/utils/types";
import { parseTime } from "../../services/utils/utils";
import styles from "./order-card.module.css";

export const OrderCard: React.FC<OrderCardProps> = ({
  number,
  time,
  name,
  ingredients,
  status,
  id,
  inFeedPage,
}) => {
  const { ingredientItems } = useAppSelector((state) => state.ingredients);

  const location = useLocation<TLocationState>();

  const objectsArray: TIngredient[] = [];

  ingredients.map((ingID) => {
    ingredientItems.forEach((item) => {
      if (ingID === item._id) objectsArray.push(item);
    });
  });

  const counter = objectsArray.length - 6;
  const date = parseTime(time);
  const totalPrice = objectsArray.reduce((sum, el) => sum + el.price, 0);

  let statusMessage;
  switch (status) {
    case "pending": {
      statusMessage = <p className={`text text_type_main-small`}>Готовится</p>;
      break;
    }
    case "done": {
      statusMessage = (
        <p style={{ color: "#00CCCC" }} className={`text text_type_main-small`}>
          Выполнен
        </p>
      );
      break;
    }
    case "created": {
      statusMessage = <p className={`text text_type_main-small`}>Создан</p>;
      break;
    }
    default:
      break;
  }

  const renderPictures = (
    item: TIngredient,
    idx: number,
    arr: TIngredient[]
  ) => {
    if (idx <= 5)
      return (
        <li
          key={idx}
          className={styles.listItem}
          style={{ zIndex: arr.length - idx }}
        >
          <img className={styles.picture} src={item.image_mobile}></img>
        </li>
      );
    else {
      return null;
    }
  };

  return (
    <Link
      className={styles.linkContainer}
      to={{
        pathname: inFeedPage ? `/feed/${id}` : `/profile/orders/${id}`,
        state: { from: location.pathname, background: location },
      }}
    >
      <div className={`${styles.container}`}>
        <div className={`${styles.metadata}`}>
          <p className={`text text_type_digits-default`}>{`#${number}`}</p>
          <p className={`text text_type_main-default text_color_inactive`}>
            {date}
          </p>
        </div>
        <div>
          <p className={`text text_type_main-medium mb-2`}>{name}</p>
          {statusMessage}
        </div>

        <div className={`${styles.orderData}`}>
          <ul className={`${styles.ingredients}`}>
            {objectsArray.map(renderPictures)}
            {counter > 0 && (
              <div
                style={{ zIndex: ingredients.length - 5 }}
                className={`${styles.counter} text text_type_main-small`}
              >
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
    </Link>
  );
};
