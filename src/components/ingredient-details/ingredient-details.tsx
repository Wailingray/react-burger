import React from "react";
import styles from "./ingredient-details.module.css";
import { useAppSelector } from "../../hooks/hooks";

const IngredientDetails: React.FC = () => {
  const { currentIngredient } = useAppSelector((state) => state.ingredients);

  if (currentIngredient !== null) {
    return (
      <>
        <span className={`${styles.title} text text_type_main-large ml-10`}>
          Детали ингридиента
        </span>
        <img
          className={styles.image}
          src={currentIngredient.image_large}
          alt={currentIngredient.name}
        />
        <p className="text text_type_main-medium mt-4 mb-8">
          {currentIngredient.name}
        </p>
        <ul className={styles.nutrition}>
          <li className={`${styles.nutrient} mb-15`}>
            <p className="text text_color_inactive text_type_main-small">
              Калории, ккал{" "}
            </p>
            <p className="text text_color_inactive text_type_digits-default">
              {currentIngredient.calories}
            </p>
          </li>
          <li className={`${styles.nutrient} text text_color_inactive`}>
            <p className="text text_color_inactive text_type_main-small">
              Белки, г{" "}
            </p>
            <p className="text text_color_inactive text_type_digits-default">
              {currentIngredient.proteins}
            </p>
          </li>
          <li className={`${styles.nutrient} text text_color_inactive`}>
            <p className="text text_color_inactive text_type_main-small">
              Жиры, г{" "}
            </p>
            <p className="text text_color_inactive text_type_digits-default">
              {currentIngredient.fat}
            </p>
          </li>
          <li className={`${styles.nutrient} text text_color_inactive`}>
            <p className="text text_color_inactive text_type_main-small">
              Углеводы, г{" "}
            </p>
            <p className="text text_color_inactive text_type_digits-default">
              {currentIngredient.carbohydrates}
            </p>
          </li>
        </ul>
      </>
    );
  }
  return null;
};

export default IngredientDetails;
