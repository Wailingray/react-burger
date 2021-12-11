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
  MOVE_ITEM
} from "../../services/actions/ingredients";
import { ConstructorIngredient } from "../constructor-ingredient/constructor-ingredient";

const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [reply, setReply] = useState(null);
  const [error, setError] = useState(null);
  const [sum, setSum] = useState(null);

  const submitOrder = useCallback(() => {
    const cart = [].concat(bun._id).concat(noBunsArray.map((el) => el._id));
    setIsModalOpened(true);
    dispatch(dispatchOrder(cart));
  }, [dispatch, dispatchOrder]);

  const closeModal = () => {
    setIsModalOpened(false);
    dispatch({
      type: ORDER_RESET,
    });
  };

  const { constructorItems } = useSelector((state) => state.ingredients);
  const { order, submitOrderRequest, submitOrderSuccess, submitOrderFailed } =
    useSelector((state) => state.order);

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

  const array = constructorItems;
  const bun = useMemo(() => array.find((el) => el.type === "bun"));
  const noBunsArray = useMemo(() => array.filter((el) => el.type !== "bun"));

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
            <li key={bun._id + 1} className={`${styles.ingredient} pr-2`}>
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
            {sum} <CurrencyIcon type="primary" />
          </p>
          {array.length ? (
            button
          ) : (
            <Button disabled="disabled" type="primary" size="large">
              Ничего не выбрано!
            </Button>
          )}
        </div>
      </section>
      {isModalOpened && modal}
    </>
  );
};

export default BurgerConstructor;
