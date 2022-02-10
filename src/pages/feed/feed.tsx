import React, { useEffect } from "react";
import { getUserOrders } from "../../components/api/api";
import { Loader } from "../../components/loader/loader";
import { OrderCard } from "../../components/order-card/order-card";
import { getItems } from "../../services/actions/ingredients";
import {
  wsConnectionClosed,
  wsConnectionStart,
} from "../../services/actions/wsActions";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import { TServerOrder } from "../../services/utils/types";
import { orderExample } from "../../services/utils/utils";
import styles from "./feed.module.css";

export const FeedPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { orders, total, totalToday, wsConnected, hasError } = useAppSelector(
    (state) => state.feed
  );

  console.log(orders);

  useEffect(() => {
    dispatch(wsConnectionStart());
    dispatch(getItems());
    getUserOrders()
    return () => {
      dispatch(wsConnectionClosed);
    };
  }, [dispatch]);

  const renderOrderCards = (item: TServerOrder, idx: number) => {
    if (idx < 10)
      return (
        <li key={idx} className={styles.li}>
          <OrderCard
            number={item.number}
            time={item.createdAt}
            name={item.name}
            ingredients={item.ingredients}
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

  if (wsConnected && !hasError)
    return (
      <div className={`${styles.page}`}>
        <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5`}>
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
              <p className={`${styles.orderTitle} text text_type_main-medium`}>
                Выполнено за все время:
              </p>
              <span className={`${styles.digits} text text_type_digits-large`}>
                {total}
              </span>
            </div>
            <div className={`${styles.doneContainer}`}>
              <p className={`${styles.orderTitle} text text_type_main-medium`}>
                Выполнено за сегодня:
              </p>
              <span className={`${styles.digits} text text_type_digits-large`}>
                {totalToday}
              </span>
            </div>
          </section>
        </div>
      </div>
    );
  else return <Loader />;
};
