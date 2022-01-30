import React, { useState, useEffect } from "react";
import styles from "./ingredient.module.css";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { IngProps, TLocationState } from "../../services/utils/interfaces";
import { useAppSelector } from "../../services/hooks/hooks";
import { Link, useLocation } from "react-router-dom";

const Ingredient: React.FC<IngProps> = (props) => {
  const [counter, setCounter] = useState(0);
  const location = useLocation<TLocationState>();
  const { constructorItems } = useAppSelector((state) => state.ingredients);

  useEffect(() => {
    setCounter(constructorItems.filter((el) => el._id === props.id).length);
  }, [constructorItems, props]);

  const [{ opacity }, ingRef] = useDrag({
    type: "item",
    item: {
      id: props.id,
      ingType: props.ingType,
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.3 : 1,
    }),
  });

  return (
    <Link
      className={styles.cardContainer}
      to={{
        pathname: `/ingredients/${props.id}`,
        state: { from: location.pathname, pushLocation: location },
      }}
    >
      <div ref={ingRef} className={styles.card} style={{ opacity }}>
        <img
          className={`${styles.image} ml-4 mr-4`}
          src={props.image}
          alt={props.name}
        />
        {counter > 0 && <Counter count={counter} size="default" />}
        <div className={`${styles.price} mt-1 mb-1`}>
          <p className={`text text_type_digits-default ${styles.value}`}>
            {props.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`text text_type_main-default ${styles.description}`}>
          {props.name}
        </p>
      </div>
    </Link>
  );
};

export default Ingredient;
