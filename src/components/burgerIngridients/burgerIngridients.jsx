import React from "react";
import PropTypes from 'prop-types';
import styles from "./burgerIngridients.module.css";
import BurgerTabs from "../burgerTabs/burgerTabs";
import Ingridient from "../ingridient/ingridient";
import { makeAnArray } from "../utils/utils";
import { sortInitialArray } from "../utils/utils";

const BurgerIngridients = (props) => {

  let array = makeAnArray(props.data);
  sortInitialArray(array);

  const bunsArray = array.filter((el) => el.type === "bun");
  const mainArray = array.filter((el) => el.type === "main");
  const sauceArray = array.filter((el) => el.type === "sauce");

  const renderIngridient = (el) => {
    return (
      <li key={el._id} className="item">
        <Ingridient
          image={el.image}
          name={el.name}
          price={el.price}
          counter={el.counter}
        ></Ingridient>
      </li>
    );
  };

  return (
    <section className={styles.section}>
      <h1 className={`text text_type_main-large ${styles.title} pt-10 pb-5`}>
        Соберите бургер
      </h1>
      <BurgerTabs />
      <div className={styles.options}>
        <div className={styles.layer}>
          <h2
            className={`text text_type_main-medium ${styles.component} pt-10 pb-6`}
          >
            Булки
          </h2>
          <ul className={`${styles.list} pl-4 pr-2`}>
            {bunsArray.map(renderIngridient)}
          </ul>
        </div>
        <div className={styles.layer}>
          <h2
            className={`text text_type_main-medium ${styles.component} pt-10 pb-6`}
          >
            Соусы
          </h2>
          <ul className={`${styles.list} pl-4 pr-2`}>
            {sauceArray.map(renderIngridient)}
          </ul>
        </div>
        <div className={styles.layer}>
          <h2
            className={`text text_type_main-medium ${styles.component} pt-10 pb-6`}
          >
            Начинки
          </h2>
          <ul className={`${styles.list} pl-4 pr-2`}>
            {mainArray.map(renderIngridient)}
          </ul>
        </div>
      </div>
    </section>
  );
};

BurgerIngridients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.IngridientPropTypes),
}

export default BurgerIngridients;
