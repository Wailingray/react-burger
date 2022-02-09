import React, { useEffect } from "react";
import { OrderCard } from "../../components/order-card/order-card";
import { getItems } from "../../services/actions/ingredients";
import { useAppDispatch } from "../../services/hooks/hooks";
import { orderExample } from "../../services/utils/utils";
import styles from "./feed.module.css";

export const FeedPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const totalDone = 123132

  const todayDone = 574

  const orderList = [
    "12213123",
    "123123123",
    "23123123",
    "12123123",
    "123123123",
    "11212312",
    "4234243",
    "34345345",
    "345435435",
    "3453453",
    "4234243",
    "34345345",
    "345435435",
    "3453453",
    "4234243",
    "34345345",
    "345435435",
    "3453453",
  ];

  const renderOrders = (item: string, idx: number) => {
    if (idx < 10)
      return (
        <li key={idx} className={styles.listItem}>
          {item}
        </li>
      );
    else {
      return null;
    }
  };

  return (
    <div className={`${styles.page}`}>
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5`}>
        Лента заказов
      </h1>
      <div className={`${styles.sections}`}>
        <section className={`${styles.orderTape}`}>
          <OrderCard
            number={orderExample.number}
            time={orderExample.createdAt}
            name={orderExample.name}
            ingredients={orderExample.ingredients}
          />
          <OrderCard
            number={orderExample.number}
            time={orderExample.createdAt}
            name={orderExample.name}
            ingredients={orderExample.ingredients}
          />
          <OrderCard
            number={orderExample.number}
            time={orderExample.createdAt}
            name={orderExample.name}
            ingredients={orderExample.ingredients}
          />
          <OrderCard
            number={orderExample.number}
            time={orderExample.createdAt}
            name={orderExample.name}
            ingredients={orderExample.ingredients}
          />
          <OrderCard
            number={orderExample.number}
            time={orderExample.createdAt}
            name={orderExample.name}
            ingredients={orderExample.ingredients}
          />
          <OrderCard
            number={orderExample.number}
            time={orderExample.createdAt}
            name={orderExample.name}
            ingredients={orderExample.ingredients}
          />
          <OrderCard
            number={orderExample.number}
            time={orderExample.createdAt}
            name={orderExample.name}
            ingredients={orderExample.ingredients}
          />
          <OrderCard
            number={orderExample.number}
            time={orderExample.createdAt}
            name={orderExample.name}
            ingredients={orderExample.ingredients}
          />
        </section>
        <section className={`${styles.orderTable}`}>
          <div className={`${styles.orderInfoContainer}`}>
            <div className={`${styles.orderInfo}`}>
              <p className={`${styles.orderTitle} text text_type_main-medium`}>
                Готовы:
              </p>
              <ul
                className={`${styles.orderList} ${styles.activeList} text text text_type_digits-default`}
              >
                {orderList.map(renderOrders)}
              </ul>
            </div>

            <div className={`${styles.orderInfo}`}>
              <p className={`${styles.orderTitle} text text_type_main-medium`}>
                В работе:
              </p>
              <ul
                className={`${styles.orderList} text text text_type_digits-default`}
              >
                {orderList.map(renderOrders)}
              </ul>
            </div>
          </div>
          <div className={`${styles.doneContainer}`}>
            <p className={`${styles.orderTitle} text text_type_main-medium`}>
              Выполнено за все время:
            </p>
            <span
              className={`${styles.digits} text text_type_digits-large`}
            >
              {totalDone}
            </span>
          </div>
          <div className={`${styles.doneContainer}`}>
            <p className={`${styles.orderTitle} text text_type_main-medium`}>
              Выполнено за сегодня:
            </p>
            <span
              className={`${styles.digits} text text_type_digits-large`}
            >
              {todayDone}
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};
