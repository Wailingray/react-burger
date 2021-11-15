import React from "react";
import PropTypes from 'prop-types';
import styles from "./burgerConstructor.module.css";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { makeAnArray } from "../utils/utils";


const BurgerConstructor = (props) => {

  const array = makeAnArray(props.cart);

  const sum = array.reduce((acc, el) => acc + el.price, 0);

  const renderFirstProduct = ({ name, image, price, _id }, index, array) => {
    if (index === 0) {
      return (
        <li key={index} className={`${styles.ingridient} pr-2`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${name} (верх)`}
            price={price}
            thumbnail={image}
          />
        </li>
      );
    }
  };

  const renderLastProduct = ({ name, image, price, _id }, index, array) => {
    if (index === array.length - 1) {
      return (
        <li key={index} className={`${styles.ingridient} pr-2`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${name} (низ)`}
            price={price}
            thumbnail={image}
          />
        </li>
      );
    }
  };

  const renderMidProducts = ({ name, image, price, _id }, index, array) => {
    if (index !== 0 && index !== array.length - 1) {
      return (
        <li key={index} className={styles.ingridient}>
          <DragIcon type="primary" />
          <ConstructorElement
            isLocked={false}
            text={name}
            price={price}
            thumbnail={image}
          />
        </li>
      );
    }
  };

  return (
    <section className={`${styles.section} pl-4 pr-2 pb-15`}>
      <ul className={`${styles.ingridientList} mt-25 mb-10`}>
        {array.map(renderFirstProduct)}
        <ul className={styles.innerList}>{array.map(renderMidProducts)}</ul>
        {array.map(renderLastProduct)}
      </ul>
      <div className={`${styles.confirmationZone} mt-10`}>
      <p className="text text_type_digits-medium">{sum} <CurrencyIcon type="primary"/></p>
      <Button type="primary" size="large">
        Оформить заказ
      </Button>
      </div>
    </section>
  );
};


BurgerConstructor.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape(PropTypes.IngridientPropTypes)).isRequired,
}


export default BurgerConstructor;
