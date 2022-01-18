import React, { useState, useEffect, useMemo, useCallback } from "react";
import styles from "./burger-constructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDrop } from "react-dnd";
import { dispatchOrder, resetOrder } from "../../services/actions/order";
import {
  recalculatePrice,
  replaceBun,
  addToConstructor,
} from "../../services/actions/ingredients";
import { ConstructorIngredient } from "../constructor-ingredient/constructor-ingredient";
import { ConstructorDraggableEl, ConstructorEL } from "../../utils/interfaces";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";

const BurgerConstructor: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(recalculatePrice());
  }, [dispatch]);

  const { constructorItems, totalPrice } = useAppSelector(
    (state) => state.ingredients
  );
  const { submitOrderSuccess, submitOrderFailed } = useAppSelector(
    (state) => state.order
  );

  const [isModalOpened, setIsModalOpened] = useState(false);

  const submitOrder = useCallback(() => {
    setIsModalOpened(true);
    dispatch(dispatchOrder(constructorItems.map((item) => item._id)));
  }, [dispatch, constructorItems]);

  const closeModal = () => {
    setIsModalOpened(false);
    dispatch(resetOrder());
  };

  const [{ isHover }, dropTarget] = useDrop({
    accept: "item",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item: ConstructorDraggableEl) {
      addItem(item);
    },
  });

  const sectionClassName = `${styles.section} pl-4 pr-2 pb-15
  ${isHover ? styles.onHover : ""}`;

  const bun = useMemo(
    () => constructorItems.find((el) => el.type === "bun"),
    [constructorItems]
  );
  const noBunsArray = useMemo(
    () => constructorItems.filter((el) => el.type !== "bun"),
    [constructorItems]
  );

  const addItem = (item: ConstructorDraggableEl) => {
    const isBun = item.ingType === "bun";
    isBun ? dispatch(replaceBun(item.id)) : dispatch(addToConstructor(item.id));
    dispatch(recalculatePrice());
  };

  const renderProducts = (
    { name, image, price, _id }: ConstructorEL,
    index: number
  ) => {
    return (
      <li key={index} className={styles.ingredient}>
        <ConstructorIngredient
          name={name}
          image={image}
          price={price}
          _id={_id}
          index={index}
        />
      </li>
    );
  };
  return (
    <>
      <section ref={dropTarget} className={sectionClassName}>
        <ul className={`${styles.ingredientList} mt-25 mb-10`}>
          {bun && (
            <li key={bun._id} className={`${styles.ingredient} pr-2`}>
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.image}
              />
            </li>
          )}
          <ul className={styles.innerList}>
            {noBunsArray && noBunsArray.map(renderProducts)}
          </ul>
          {bun && (
            <li key={bun._id + "низ"} className={`${styles.ingredient} pr-2`}>
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${bun.name} (низ)`}
                price={bun.price}
                thumbnail={bun.image}
              />
            </li>
          )}
          {constructorItems.length === 0 && (
            <p className="mt-15 text text_type_main-medium">
              Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа
            </p>
          )}
        </ul>
        <div className={`${styles.confirmationZone} mt-10`}>
          <p className="text text_type_digits-medium">
            {totalPrice} <CurrencyIcon type="primary" />
          </p>
          <Button onClick={submitOrder} type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </section>
      {isModalOpened && (submitOrderSuccess || submitOrderFailed) && (
        <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;
