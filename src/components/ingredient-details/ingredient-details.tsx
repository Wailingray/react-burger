import React, { useEffect, useState } from "react";
import styles from "./ingredient-details.module.css";
import {
  useAppDispatch,
  useAppParams,
  useAppSelector,
} from "../../services/hooks/hooks";
import { TIngredient } from "../../services/utils/types";
import { getItems } from "../../services/actions/ingredients";
import { Loader } from "../loader/loader";

const IngredientDetails: React.FC = () => {
  const {
    currentIngredient,
    ingredientItems,
    ingredientItemsRequest,
    ingredientItemsFailed,
  } = useAppSelector((state) => state.ingredients);
  const { id } = useAppParams();
  const dispatch = useAppDispatch();

  const [loaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (ingredientItemsRequest || ingredientItemsFailed) setIsLoaded(true);
  }, [ingredientItemsRequest, ingredientItemsRequest]);

  useEffect(() => {
    if (ingredientItems.length === 0) dispatch(getItems());
  }, [ingredientItems]);

  let modalIngredient, storeIngredient;
  id
    ? (storeIngredient = ingredientItems.find((item) => item._id === id))
    : (modalIngredient = currentIngredient);

  if (
    ingredientItems.length !== 0 &&
    !ingredientItemsFailed &&
    !ingredientItemsRequest
  ) {
    if (modalIngredient)
      return (
        <>
          <span className={`${styles.title} text text_type_main-large ml-10`}>
            Детали ингридиента
          </span>
          <img
            className={styles.image}
            src={modalIngredient?.image_large}
            alt={modalIngredient?.name}
          />
          <p className="text text_type_main-medium mt-4 mb-8">
            {modalIngredient?.name}
          </p>
          <ul className={styles.nutrition}>
            <li className={`${styles.nutrient} mb-15`}>
              <p className="text text_color_inactive text_type_main-small">
                Калории, ккал{" "}
              </p>
              <p className="text text_color_inactive text_type_digits-default">
                {modalIngredient?.calories}
              </p>
            </li>
            <li className={`${styles.nutrient} text text_color_inactive`}>
              <p className="text text_color_inactive text_type_main-small">
                Белки, г{" "}
              </p>
              <p className="text text_color_inactive text_type_digits-default">
                {modalIngredient?.proteins}
              </p>
            </li>
            <li className={`${styles.nutrient} text text_color_inactive`}>
              <p className="text text_color_inactive text_type_main-small">
                Жиры, г{" "}
              </p>
              <p className="text text_color_inactive text_type_digits-default">
                {modalIngredient?.fat}
              </p>
            </li>
            <li className={`${styles.nutrient} text text_color_inactive`}>
              <p className="text text_color_inactive text_type_main-small">
                Углеводы, г{" "}
              </p>
              <p className="text text_color_inactive text_type_digits-default">
                {modalIngredient?.carbohydrates}
              </p>
            </li>
          </ul>
        </>
      );
    else if (storeIngredient)
      if (loaded) {
        return (
          <div className={styles.pageContainer}>
            <span className={`${styles.pageTitle} text text_type_main-large`}>
              Детали ингридиента
            </span>
            <img
              className={styles.image}
              src={storeIngredient?.image_large}
              alt={storeIngredient?.name}
            />
            <p className="text text_type_main-medium mt-4 mb-8">
              {storeIngredient?.name}
            </p>
            <ul className={styles.nutrition}>
              <li className={`${styles.nutrient} mb-15`}>
                <p className="text text_color_inactive text_type_main-small">
                  Калории, ккал{" "}
                </p>
                <p className="text text_color_inactive text_type_digits-default">
                  {storeIngredient?.calories}
                </p>
              </li>
              <li className={`${styles.nutrient} text text_color_inactive`}>
                <p className="text text_color_inactive text_type_main-small">
                  Белки, г{" "}
                </p>
                <p className="text text_color_inactive text_type_digits-default">
                  {storeIngredient?.proteins}
                </p>
              </li>
              <li className={`${styles.nutrient} text text_color_inactive`}>
                <p className="text text_color_inactive text_type_main-small">
                  Жиры, г{" "}
                </p>
                <p className="text text_color_inactive text_type_digits-default">
                  {storeIngredient?.fat}
                </p>
              </li>
              <li className={`${styles.nutrient} text text_color_inactive`}>
                <p className="text text_color_inactive text_type_main-small">
                  Углеводы, г{" "}
                </p>
                <p className="text text_color_inactive text_type_digits-default">
                  {storeIngredient?.carbohydrates}
                </p>
              </li>
            </ul>
          </div>
        );
      } else return <Loader />;
  }
  return <Loader />;
};

export default IngredientDetails;
