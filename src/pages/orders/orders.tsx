import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Loader } from "../../components/loader/loader";
import { OrderCard } from "../../components/order-card/order-card";
import { ProfileNavBar } from "../../components/profile-nav/profile-nav";
import { getItems } from "../../services/actions/ingredients";
import { dispatchLogout, removeServerError } from "../../services/actions/user";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import { orderExample } from "../../services/utils/utils";
import styles from "./orders.module.css";

export const Orders: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const {
    user,
    submitGetUserSuccess,
    foundNoTokens,
    submitServerRequest,
    submitLogoutSuccess,
    submitChangeCredentialsSuccess,
  } = useAppSelector((state) => state.user);

  const [loaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  useEffect(() => {
    if (submitGetUserSuccess || foundNoTokens) setIsLoaded(true);
    return () => {
      dispatch(removeServerError());
    };
  }, [submitGetUserSuccess, foundNoTokens]);

  const handleLogout = () => {
    dispatch(dispatchLogout());
  };

  return loaded ? (
    <div className={`${styles.profilePageContainer}`}>
      <div className={`${styles.navContainer}`}>
        <ul className={`${styles.navLinkList}`}>
          <ProfileNavBar />
        </ul>
      </div>
      <div className={`${styles.formContainer}`}>
        <section className={styles.orderTape}>
          <OrderCard
            number={orderExample.number}
            time={orderExample.createdAt}
            name={orderExample.name}
            ingredients={orderExample.ingredients}
            status='pending'
          />
          <OrderCard
            number={orderExample.number}
            time={orderExample.createdAt}
            name={orderExample.name}
            ingredients={orderExample.ingredients}
            status='done'
          />
          <OrderCard
            number={orderExample.number}
            time={orderExample.createdAt}
            name={orderExample.name}
            ingredients={orderExample.ingredients}
            status='cancelled'
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
      </div>
    </div>
  ) : (
    <Loader />
  );
};
