import React, { useState } from "react";
import {
  useAppDispatch,
  useAppParams,
  useAppSelector,
} from "../../services/hooks/hooks";
import { TIngredient } from "../../services/utils/types";
import { Loader } from "../loader/loader";
import styles from "./order-modal.module.css";

export const OrderModal: React.FC = () => {
  const { modalOrder } = useAppSelector((state) => state.order);
  const { ingredientItems } = useAppSelector((state) => state.ingredients);

  const objectsArray: TIngredient[] = [];

  if (modalOrder) {
    modalOrder.ingredients.map((ingID) => {
      ingredientItems.forEach((item) => {
        if (ingID === item._id) objectsArray.push(item);
      });
    });
  }

  const renderIngredient = (el: TIngredient, idx: string, arr: TIngredient[]) => {
    return (
      <li key={idx}>
        <div className={`${styles.ingredientContainer}`}>
          <div className={`${styles.pictureContainer}`}>
            <img
              className={`${styles.picture}`}
              src={el.image_mobile}
              alt="pic"
            />
          </div>
          <p className={`text text_type_main-default ml-4 mr-4`}>{el.name}</p>
          <div className={`${styles.priceContainer}`}></div>
        </div>
      </li>
    );
  };

  const { id } = useAppParams();
  const dispatch = useAppDispatch();

  const [loaded, setIsLoaded] = useState(false);

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

  if (modalOrder)
    return (
      <div className={`${styles.container}`}>
        <span
          className={`${styles.number} text text_type_digits-default mb-10`}
        >
          {modalOrder.number}
        </span>
        <h1 className={`${styles.name} text text_type_main-medium mb-3`}>
          {modalOrder.name}
        </h1>
        {statusMessage}
        <p className="text text_type_main-default mt-15 mb-6">Состав</p>
        <ul className={`${styles.ingredientsList}`}>{}</ul>
      </div>
    );
  else return <Loader />;
};
