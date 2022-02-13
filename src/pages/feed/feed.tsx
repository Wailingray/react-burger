import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getUserOrders } from "../../components/api/api";
import { Loader } from "../../components/loader/loader";
import Modal from "../../components/modal/modal";
import { OrderCard } from "../../components/order-card/order-card";
import { OrderModal } from "../../components/order-modal/order-modal";
import { getItems } from "../../services/actions/ingredients";
import { orderPopupReset, sendOrderToModal } from "../../services/actions/order";
import {
  wsConnectionClosed,
  wsConnectionStart,
} from "../../services/actions/wsActions";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import { TServerOrder } from "../../services/utils/types";
import { orderExample } from "../../services/utils/utils";
import styles from "./feed.module.css";

export const FeedPage: React.FC = () => {
  const history = useHistory()
  const dispatch = useAppDispatch();
  const { orders, total, totalToday, wsConnected, hasError } = useAppSelector(
    (state) => state.feed
  );

  useEffect(() => {
    dispatch(wsConnectionStart());
    dispatch(getItems());
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);

  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpened(true);
  };

  const closeModal = () => {
    setIsModalOpened(false);
    dispatch(orderPopupReset());
    history.goBack()
  };


  const renderOrderCards = (item: TServerOrder, idx: number) => {
    const showOrder = (evt: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      dispatch(sendOrderToModal(item));
      openModal();
    };
    if (idx < 10)
      return (
        <li key={idx} onClick={showOrder}>
          <OrderCard
            number={item.number}
            time={item.createdAt}
            name={item.name}
            ingredients={item.ingredients}
            id={item._id}
            inFeedPage={true}
          />
        </li>
      );
    else {
      return null;
    }
  };

  const renderOrderNumbers = (item: TServerOrder, idx: number) => {
    if (idx < 10)
      return (
        <li key={idx} className={styles.listItem}>
          {item.number}
        </li>
      );
    else {
      return null;
    }
  };

  if (wsConnected && !hasError) {
    return (
      <>
        <div className={`${styles.page}`}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5`}
          >
            Лента заказов
          </h1>
          <div className={`${styles.sections}`}>
            <ul className={`${styles.orderTape}`}>
              {orders.map(renderOrderCards)}
            </ul>
            <section className={`${styles.orderTable}`}>
              <div className={`${styles.orderInfoContainer}`}>
                <div className={`${styles.orderInfo}`}>
                  <p
                    className={`${styles.orderTitle} text text_type_main-medium`}
                  >
                    Готовы:
                  </p>
                  <ul
                    className={`${styles.orderList} ${styles.activeList} text text text_type_digits-default`}
                  >
                    {orders.map(renderOrderNumbers)}
                  </ul>
                </div>

                <div className={`${styles.orderInfo}`}>
                  <p
                    className={`${styles.orderTitle} text text_type_main-medium`}
                  >
                    В работе:
                  </p>
                  <ul
                    className={`${styles.orderList} text text text_type_digits-default`}
                  >
                    {orders.map(renderOrderNumbers)}
                  </ul>
                </div>
              </div>
              <div className={`${styles.doneContainer}`}>
                <p
                  className={`${styles.orderTitle} text text_type_main-medium`}
                >
                  Выполнено за все время:
                </p>
                <span
                  className={`${styles.digits} text text_type_digits-large`}
                >
                  {total}
                </span>
              </div>
              <div className={`${styles.doneContainer}`}>
                <p
                  className={`${styles.orderTitle} text text_type_main-medium`}
                >
                  Выполнено за сегодня:
                </p>
                <span
                  className={`${styles.digits} text text_type_digits-large`}
                >
                  {totalToday}
                </span>
              </div>
            </section>
          </div>
        </div>
        {isModalOpened && (
          <Modal onClose={closeModal}>
            <OrderModal />
          </Modal>
        )}
        );
      </>
    );
  }
  else return <Loader />
};
