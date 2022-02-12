
import styles from "./order-page.module.css";
import { OrderModal } from "../../components/order-modal/order-modal";
import { useEffect } from "react";
import { useAppDispatch } from "../../services/hooks/hooks";
import { wsConnectionClosed, wsConnectionStart } from "../../services/actions/wsActions";
import { getItems } from "../../services/actions/ingredients";

export const OrderPage = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(wsConnectionStart());
    dispatch(getItems());
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);

  return (
      <div className={styles.container}>
        <OrderModal />
      </div>
  );
};
