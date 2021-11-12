import React from "react";
import styles from "./burgerConstructor.module.css";
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'

const BurgerConstructor = (props) => {

  const makeAnArray = () => {
    const array = [];
    const objectArray = Object.entries(props);
    objectArray.forEach(([key, value]) => {
    array.push(value);
    });
    return array;
  }

  const array = makeAnArray();

  const renderProduct = (({name, image, price, _id}) =>
    <li key={_id} className="ingridient">
      <ConstructorElement
      type="top"
      isLocked={true}
      text={name}
      price={price}
      thumbnail={image}
      />
    </li>
  )




  return (
    <section className={styles.section}>
      <ul className={`${styles.ingridientList} mt-25`}>
        {array.map(renderProduct)}
      </ul>
    </section>
  );
}

export default BurgerConstructor;
