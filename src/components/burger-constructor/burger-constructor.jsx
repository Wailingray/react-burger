import { React, useState, useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./burger-constructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDrop } from "react-dnd";
import { dispatchOrder, ORDER_RESET } from "../../services/actions/order";
import {
  ADD_TO_CONSTRUCTOR,
  REPLACE_BUN,
  RECALCULATE_PRICE,
} from "../../services/actions/ingredients";
import { ConstructorIngredient } from "../constructor-ingredient/constructor-ingredient";

const BurgerConstructor = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: RECALCULATE_PRICE,
    });
  }, [dispatch]);

  const { constructorItems, totalPrice } = useSelector(
    (state) => state.ingredients
  );
  const { submitOrderRequest, submitOrderSuccess, submitOrderFailed } =
    useSelector((state) => state.order);

  const [isModalOpened, setIsModalOpened] = useState(false);

  const submitOrder = useCallback(() => {
    setIsModalOpened(true);
    dispatch(dispatchOrder(constructorItems.map((item) => item._id)));
  }, [dispatch, constructorItems]);

  const closeModal = () => {
    setIsModalOpened(false);
    dispatch({
      type: ORDER_RESET,
    });
  };

  const [{ isHover }, dropTarget] = useDrop({
    accept: "item",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
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

  const addItem = (item) => {
    const isBun = item.ingType === "bun";
    dispatch({
      type: isBun ? REPLACE_BUN : ADD_TO_CONSTRUCTOR,
      id: item.id,
    });
    dispatch({
      type: RECALCULATE_PRICE,
    });
  };

  const renderProducts = ({ name, image, price, _id }, index) => {
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

  const isDisabled =
    constructorItems.length > 1 && bun && !submitOrderRequest ? false : true;
  const buttonText =
    constructorItems.length > 1 && bun
      ? submitOrderRequest
        ? "Подождите..."
        : "Оформить заказ"
      : "Соберите бургер!";

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
        </ul>
        <div className={`${styles.confirmationZone} mt-10`}>
          <p className="text text_type_digits-medium">
            {totalPrice} <CurrencyIcon type="primary" />
          </p>
          <Button
            onClick={submitOrder}
            disabled={isDisabled ? "disabled" : ""}
            type="primary"
            size="large"
          >
            {buttonText}
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
