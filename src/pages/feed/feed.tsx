import React from "react";
import { OrderCard } from "../../components/order-card/order-card";
import { orderExample } from "../../services/utils/utils";
import styles from "./feed.module.css";

export const FeedPage: React.FC = () => {
  return (
    <div className={`${styles.page}`}>
      <p className={`${styles.title} text text_type_main-large mt-10 mb-5`}>
        Лента заказов
      </p>
      <div className={`${styles.sections}`}>
        <section className={`${styles.orderTape}`}>
          <OrderCard
            number={orderExample.number}
            time={orderExample.createdAt}
            name={orderExample.status}
            ingredients={orderExample.ingredients}
          />
          <OrderCard
            number={orderExample.number}
            time={orderExample.createdAt}
            name={orderExample.status}
            ingredients={orderExample.ingredients}
          />
        </section>
        <section>qwewqe</section>
      </div>
    </div>
  );
};
