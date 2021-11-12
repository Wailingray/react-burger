import React from "react";
import styles from "./burgerConstructor.module.css";
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'

const burgerConstructor = (props) => {
  return (
    <section className={styles.section}>
      <ul className={`${styles.ingridientList} mt-25`}>
        <li className="ingridient">
          <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={img}
         />
        </li>
        <li className="ingridient">
          <ConstructorElement
          text="Краторная булка N-200i (верх)"
          price={50}
          thumbnail={img}
          />
        </li>
      </ul>
    </section>
  );
}

export default burgerConstructor;
