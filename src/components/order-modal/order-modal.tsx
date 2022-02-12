import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState } from "react";
import {
  useAppDispatch,
  useAppParams,
  useAppSelector,
} from "../../services/hooks/hooks";
import { TIngredient } from "../../services/utils/types";
import { parseTime } from "../../services/utils/utils";
import { Loader } from "../loader/loader";
import styles from "./order-modal.module.css";

export const OrderModal: React.FC = () => {
  const { modalOrder } = useAppSelector((state) => state.order);
  const { ingredientItems } = useAppSelector((state) => state.ingredients);
  const { orders } = useAppSelector((state) => state.feed);

  const objectsArray: TIngredient[] = [];

  if (modalOrder) {
  }

  const renderIngredient = (
    el: TIngredient,
    idx: number,
    arr: TIngredient[]
  ) => {
    /* let counter = arr.reduce((count, item) => {
      if (item._id === el._id) {
        return count + 1;
      }
      return count;
    }, 0); */

    return (
      <li key={el._id}>
        <div className={`${styles.ingredientContainer}`}>
          <div className={`${styles.tagContainer}`}>
            <div className={`${styles.pictureContainer}`}>
              <img
                className={`${styles.picture}`}
                src={el.image_mobile}
                alt="pic"
              />
            </div>
            <p className={`text text_type_main-default ml-4 mr-4`}>{el.name}</p>
          </div>
          <div className={`${styles.priceContainer}`}>
            <p className="text text_type_digits-default">{`${1} x ${
              el.price
            }`}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </li>
    );
  };

  /* const makeUnique = (array: TIngredient[]) => {
    return array.filter(
      (e, i) => array.findIndex((a) => a._id === e._id) === i
    );
  }; */

  const { id } = useAppParams();
  const dispatch = useAppDispatch();

  let orderFromModal, orderFromStore;
  id
    ? (orderFromStore = orders.find((item) => item._id === id))
    : (orderFromModal = modalOrder);

  let statusMessage;
  switch (modalOrder?.status) {
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

  if (orderFromModal) {
    orderFromModal.ingredients.map((ingID) => {
      ingredientItems.forEach((item) => {
        if (ingID === item._id) objectsArray.push(item);
      });
    });

    const totalPrice = objectsArray.reduce((sum, el) => sum + el.price, 0);
    const date = parseTime(orderFromModal.createdAt);

    return (
      <div className={`${styles.container}`}>
        <span
          className={`${styles.number} text text_type_digits-default mb-10`}
        >
          {`#${orderFromModal.number}`}
        </span>
        <h1 className={`${styles.name} text text_type_main-medium mb-3`}>
          {orderFromModal.name}
        </h1>
        {statusMessage}
        <p className="text text_type_main-medium mt-15 mb-6">Состав</p>
        <ul className={`${styles.ingredientsList}`}>
          {objectsArray.map(renderIngredient)}
        </ul>
        <div className={`${styles.footer} mt-10`}>
          <p className={`text text_type_main-default text_color_inactive`}>
            {date}
          </p>
          <div className={`${styles.priceContainer}`}>
            <p className="text text_type_digits-default">{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    );
  }
  else if (orderFromStore) {
    orderFromStore.ingredients.map((ingID) => {
      ingredientItems.forEach((item) => {
        if (ingID === item._id) objectsArray.push(item);
      });
    });

    const totalPrice = objectsArray.reduce((sum, el) => sum + el.price, 0);
    const date = parseTime(orderFromStore.createdAt);

    return (
      <div className={`${styles.container}`}>
        <span
          className={`${styles.number} text text_type_digits-default mb-10`}
        >
          {`#${orderFromStore.number}`}
        </span>
        <h1 className={`${styles.name} text text_type_main-medium mb-3`}>
          {orderFromStore.name}
        </h1>
        {statusMessage}
        <p className="text text_type_main-medium mt-15 mb-6">Состав</p>
        <ul className={`${styles.ingredientsList}`}>
          {objectsArray.map(renderIngredient)}
        </ul>
        <div className={`${styles.footer} mt-10`}>
          <p className={`text text_type_main-default text_color_inactive`}>
            {date}
          </p>
          <div className={`${styles.priceContainer}`}>
            <p className="text text_type_digits-default">{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    )
  }
  else return <Loader />;
};
