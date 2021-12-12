import {
  React,
  useState,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./burger-constructor.module.css";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { hardCode } from "../../utils/utils";
import { useDrop } from "react-dnd";
import { dispatchOrder, ORDER_RESET } from "../../services/actions/order";
import {
  ADD_TO_CONSTRUCTOR,
  REMOVE_FROM_CONSTRUCTOR,
  REPLACE_BUN,
  MOVE_ITEM,
  RECALCULATE_PRICE,
} from "../../services/actions/ingredients";
import { ConstructorIngredient } from "../constructor-ingredient/constructor-ingredient";

const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const { constructorItems, totalPrice } = useSelector(
    (state) => state.ingredients
  );
  const { order, submitOrderRequest, submitOrderSuccess, submitOrderFailed } =
    useSelector((state) => state.order);

  const [isModalOpened, setIsModalOpened] = useState(false);

  const submitOrder = useCallback(() => {
    setIsModalOpened(true);
    dispatch(dispatchOrder(constructorItems.map((item) => item._id)));
  }, [dispatch, dispatchOrder, constructorItems]);

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

  const bun = useMemo(() => constructorItems.find((el) => el.type === "bun"));
  const noBunsArray = useMemo(() =>
    constructorItems.filter((el) => el.type !== "bun")
  );

  const addItem = (item) => {
    item.ingType === "bun"
      ? dispatch({
          type: REPLACE_BUN,
          id: item.id,
          ingType: item.type,
        })
      : dispatch({
          type: ADD_TO_CONSTRUCTOR,
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

  const modal = useMemo(() => {
    return submitOrderSuccess || submitOrderFailed ? (
      <Modal onClose={closeModal}>
        <OrderDetails />
      </Modal>
    ) : (
      ""
    );
  }, [submitOrderSuccess, closeModal]);

  const button = useMemo(() => {
    return submitOrderRequest ? (
      <Button
        onClick={submitOrder}
        disabled="disabled"
        type="primary"
        size="large"
      >
        Подождите...
      </Button>
    ) : (
      <Button onClick={submitOrder} type="primary" size="large">
        Оформить заказ
      </Button>
    );
  }, [submitOrderRequest, submitOrder]);

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
            <li key={bun._id + 'низ'} className={`${styles.ingredient} pr-2`}>
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
          {constructorItems.length > 1 && bun ? (
            button
          ) : (
            <Button disabled="disabled" type="primary" size="large">
              Соберите бургер!
            </Button>
          )}
        </div>
      </section>
      {isModalOpened && modal}
    </>
  );
};

export default BurgerConstructor;
