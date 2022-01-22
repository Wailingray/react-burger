import React, { useState, useEffect } from "react";
import styles from "./ingredient.module.css";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { IngProps } from "../../services/utils/interfaces";
import { useAppSelector } from "../../services/hooks/hooks";

const Ingredient: React.FC<IngProps> = (props) => {
  const [counter, setCounter] = useState(0);

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
  );
};

export default Ingredient;
