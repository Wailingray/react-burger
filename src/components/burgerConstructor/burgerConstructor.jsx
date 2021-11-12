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

  const renderProduct = (({name, image, price, _id},index,array) =>
    {if (index===0) {
      return <li key={_id} className={styles.ingridient}>
        <ConstructorElement
        type="top"
        isLocked={true}
        text={`${name} (верх)` }
        price={price}
        thumbnail={image}
        />
      </li>
      }
    else if (index===array.length-1) {
      return <li key={_id} className={styles.ingridient}>
        <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${name} (низ)` }
        price={price}
        thumbnail={image}
        />
      </li>
    }
    else {
      return <li key={_id} className={styles.ingridient}>
        <ConstructorElement
        isLocked={false}
        text={name}
        price={price}
        thumbnail={image}
        />
      </li>
    }
    }
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
