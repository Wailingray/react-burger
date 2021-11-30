import { React, useState, useContext } from "react";
import PropTypes, { arrayOf } from "prop-types";
import styles from "./burger-constructor.module.css";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { IngredientPropTypes } from "../utils/utils";
import { ConstructorContext } from "../../context/constructor-context";

const BurgerConstructor = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const openModal = () => {
    setIsModalOpened(true);
  };

  const closeModal = () => {
    setIsModalOpened(false);
  };

  const array = useContext(ConstructorContext);
  console.log(array)

 const bun = array.find((el) => el.type === "bun");

  const noBunsArray = array.filter((el) => el.type !== "bun");

  const sum = array.reduce((acc, el) => acc + el.price, 0);

  const renderProducts = ({ name, image, price, _id }, index) => {
    return (
      <li key={index} className={styles.ingredient}>
        <DragIcon type="primary" />
        <ConstructorElement
          isLocked={false}
          text={name}
          price={price}
          thumbnail={image}
        />
      </li>
    );
  };

  return (
    <>
      <section className={`${styles.section} pl-4 pr-2 pb-15`}>
        <ul className={`${styles.ingredientList} mt-25 mb-10`}>
          <li key={bun._id + 1} className={`${styles.ingredient} pr-2`}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </li>
          <ul className={styles.innerList}>
            {noBunsArray.map(renderProducts)}
          </ul>
          <li key={bun._id} className={`${styles.ingredient} pr-2`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </li>
        </ul>
        <div className={`${styles.confirmationZone} mt-10`}>
          <p className="text text_type_digits-medium">
            {sum} <CurrencyIcon type="primary" />
          </p>
          <Button onClick={openModal} type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </section>
      {isModalOpened && (
        <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};

/* BurgerConstructor.propTypes = {
  cart: PropTypes.arrayOf(IngredientPropTypes).isRequired,
}; */

export default BurgerConstructor;
