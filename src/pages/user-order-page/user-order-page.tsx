import styles from "./user-order-page.module.css";
import { OrderModal } from "../../components/order-modal/order-modal";
import { useEffect } from "react";
import { useAppDispatch } from "../../services/hooks/hooks";
import {
  wsConnectionClosed,
  wsConnectionStart,
} from "../../services/actions/wsVanillaActions";
import { getItems } from "../../services/actions/ingredients";
import { wsPrivateConnectionClosed, wsPrivateConnectionStart } from "../../services/actions/wsUserActions";

export const UserOrderPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(wsPrivateConnectionStart());
    dispatch(getItems());
    return () => {
      dispatch(wsPrivateConnectionClosed);
    };
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <OrderModal />
    </div>
  );
};
