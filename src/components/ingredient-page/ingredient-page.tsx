import IngredientDetails from "../ingredient-details/ingredient-details";
import styles from "./ingredient-page.module.css";

export const IngredientPage = () => {
  return (
      <div className={styles.linkContainer}>
        <IngredientDetails />
      </div>
  );
};
