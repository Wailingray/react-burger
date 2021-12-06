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
import { dispatchOrder } from "../../services/actions/order";

const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [reply, setReply] = useState(null);
  const [error, setError] = useState(null);
  const [sum, setSum] = useState(null);

  const submitOrder = useCallback(() => {
    setIsModalOpened(true)
    dispatch(dispatchOrder(cart));
  }, [dispatch, dispatchOrder]);

   const closeModal = () => {
    setIsModalOpened(false);

  };

  const { constructorItems } = useSelector((state) => state.cart);
  const { submitOrderRequest, submitOrderSuccess } = useSelector(
    (state) => state.order
  );

  const array = constructorItems;
  const bun = useMemo(() => array.find((el) => el.type === "bun"));
  const noBunsArray = useMemo(() => array.filter((el) => el.type !== "bun"));
  const cart = [].concat(bun._id).concat(noBunsArray.map((el) => el._id));




  /* useEffect(() => {
    bun &&
      setSum(
        noBunsArray.reduce((acc, el) => acc + el.price, 0) + bun.price * 2
      );
    bun && setCart([].concat(bun._id).concat(noBunsArray.map((el) => el._id)));
  }, [array, bun]); */

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

const modal = useMemo(() => {
    return submitOrderSuccess ? (
      <Modal onClose={closeModal}>
        <OrderDetails />
      </Modal>
    ) : ('');
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
      <Button
        onClick={submitOrder}
        type="primary"
        size="large"
      >
        Оформить заказ
      </Button>
    );
  }, [submitOrderRequest, submitOrder]);

  return (
    <>
      <section className={`${styles.section} pl-4 pr-2 pb-15`}>
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
            {noBunsArray.map(renderProducts)}
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
          {button}
        </div>
      </section>
      {isModalOpened && (
        modal
      )}
    </>
  );
};

export default BurgerConstructor;
