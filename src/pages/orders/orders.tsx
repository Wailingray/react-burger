import React, { useEffect, useMemo, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Loader } from "../../components/loader/loader";
import Modal from "../../components/modal/modal";
import { OrderCard } from "../../components/order-card/order-card";
import { OrderModal } from "../../components/order-modal/order-modal";
import { ProfileNavBar } from "../../components/profile-nav/profile-nav";
import { getItems } from "../../services/actions/ingredients";
import {
  orderPopupReset,
  sendOrderToModal,
} from "../../services/actions/order";
import { dispatchLogout, removeServerError } from "../../services/actions/user";
import {
  wsPrivateConnectionClosed,
  wsPrivateConnectionStart,
} from "../../services/actions/wsUserActions";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import { TServerOrder } from "../../services/utils/types";
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

  const { userOrders, total, totalToday, wsConnected, hasError } =
    useAppSelector((state) => state.userFeed);

  const [loaded, setIsLoaded] = useState(false);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  useEffect(() => {
    dispatch(wsPrivateConnectionStart());
    dispatch(getItems());
    return () => {
      dispatch(wsPrivateConnectionClosed);
    };
  }, [dispatch]);

  useEffect(() => {
    if (submitGetUserSuccess || foundNoTokens) setIsLoaded(true);
    return () => {
      dispatch(removeServerError());
    };
  }, [submitGetUserSuccess, foundNoTokens]);

  const openModal = () => {
    setIsModalOpened(true);
  };

  const closeModal = () => {
    setIsModalOpened(false);
    dispatch(orderPopupReset());
    history.goBack();
  };

  const renderOrderCards = (item: TServerOrder, idx: number) => {
    const showOrder = (evt: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      dispatch(sendOrderToModal(item));
      openModal();
    };

    if (idx < 15)
      return (
        <li key={idx} onClick={showOrder} className={styles.cardContainer}>
          <OrderCard
            number={item.number}
            time={item.createdAt}
            name={item.name}
            status={item.status}
            ingredients={item.ingredients}
            id={item._id}
            inFeedPage={false}
          />
        </li>
      );
    else {
      return null;
    }
  };

  return loaded ? (
    <div className={`${styles.profilePageContainer}`}>
      <div className={`${styles.navContainer}`}>
        <ul className={`${styles.navLinkList}`}>
          <ProfileNavBar />
        </ul>
      </div>
      <div className={`${styles.formContainer}`}>
        <ul className={styles.orderTape}>
          {userOrders
            .map((el) => el)
            .reverse()
            .map(renderOrderCards)}
        </ul>
      </div>
      {isModalOpened && (
          <Modal onClose={closeModal}>
            <OrderModal />
          </Modal>
        )}
    </div>
  ) : (
    <Loader />
  );
};
