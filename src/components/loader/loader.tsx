import React from "react";
import styles from "./loader.module.css";
import loading from "../../images/loading.png";

export const Loader: React.FC = () => {
  return (
    <div className={styles.loaderContainer}>
      <img className={styles.loader} src={loading} alt="Please wait..." />
    </div>
  );
};
