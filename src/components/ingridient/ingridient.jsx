import React from 'react';
import styles from "./ingridient.module.css";
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const Ingridient = (props) => {
  if (props.count) {
    return (
      <div className={styles.card}>
        <img
          className={`${styles.image} ml-4 mr-4`}
          src={props.image}
          alt={props.name}
        />
        <Counter count={props.count} size="default"/>
        <div className={`${styles.price} mt-1 mb-1`}>
          <p className={`text text_type_digits-default ${styles.value}`}>
            {props.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`text text_type_main-default ${styles.description}`}>{props.name}</p>
      </div>
    );
  }
  else return (
    <div className={styles.card}>
      <img
        className={`${styles.image} ml-4 mr-4`}
        src={props.image}
        alt={props.name}
      />
      <div className={`${styles.price} mt-1 mb-1`}>
        <p className={`text text_type_digits-default ${styles.value}`}>
          {props.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`text text_type_main-default ${styles.description}`}>{props.name}</p>
    </div>
  );
};

export default Ingridient;
