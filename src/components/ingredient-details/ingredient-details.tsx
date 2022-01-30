import React, { useEffect } from "react";
import styles from "./ingredient-details.module.css";
import { useAppDispatch, useAppParams, useAppSelector } from "../../services/hooks/hooks";
import { TIngredient } from "../../services/utils/types";
import { getItems } from "../../services/actions/ingredients";


const IngredientDetails: React.FC = () => {

  const { currentIngredient, ingredientItems, ingredientItemsRequest, ingredientItemsFailed } = useAppSelector((state) => state.ingredients);
  const { id } = useAppParams();
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (ingredientItems.length === 0) dispatch(getItems())
  }, [ingredientItems]);

  let activeIngredient
    if (id) {
       activeIngredient = ingredientItems.find(item => item._id === id)
    } else {
       activeIngredient = currentIngredient
    }

  if (ingredientItems.length !== 0 && !ingredientItemsRequest && !ingredientItemsFailed) {
    return (
      <>
        <span className={`${styles.title} text text_type_main-large ml-10`}>
          Детали ингридиента
        </span>
        <img
          className={styles.image}
          src={activeIngredient?.image_large}
          alt={activeIngredient?.name}
        />
        <p className="text text_type_main-medium mt-4 mb-8">
          {activeIngredient?.name}
        </p>
        <ul className={styles.nutrition}>
          <li className={`${styles.nutrient} mb-15`}>
            <p className="text text_color_inactive text_type_main-small">
              Калории, ккал{" "}
            </p>
            <p className="text text_color_inactive text_type_digits-default">
              {activeIngredient?.calories}
            </p>
          </li>
          <li className={`${styles.nutrient} text text_color_inactive`}>
            <p className="text text_color_inactive text_type_main-small">
              Белки, г{" "}
            </p>
            <p className="text text_color_inactive text_type_digits-default">
              {activeIngredient?.proteins}
            </p>
          </li>
          <li className={`${styles.nutrient} text text_color_inactive`}>
            <p className="text text_color_inactive text_type_main-small">
              Жиры, г{" "}
            </p>
            <p className="text text_color_inactive text_type_digits-default">
              {activeIngredient?.fat}
            </p>
          </li>
          <li className={`${styles.nutrient} text text_color_inactive`}>
            <p className="text text_color_inactive text_type_main-small">
              Углеводы, г{" "}
            </p>
            <p className="text text_color_inactive text_type_digits-default">
              {activeIngredient?.carbohydrates}
            </p>
          </li>
        </ul>
      </>
    );
  }
  return null;
};

export default IngredientDetails;
