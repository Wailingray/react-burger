import React from "react";
import styles from "./ingridientDetails.module.css";
import PropTypes from 'prop-types';

const IngridientDetails = (props) => {
  return (
    <>
    <span className={`${styles.title} text text_type_main-large ml-10`}>
      Детали ингридиента
    </span>
    <img className={styles.image} src={props.image_large} alt={props.name} />
    <p className="text text_type_main-medium mt-4 mb-8">{props.name}</p>
    <ul className={styles.nutrition} >
      <li className={`${styles.nutrient} mb-15`}>
        <p className="text text_color_inactive text_type_main-small">Калории, ккал </p>
        <p className="text text_color_inactive text_type_digits-default">{props.calories}</p>
      </li>
      <li className={`${styles.nutrient} text text_color_inactive`}>
        <p className="text text_color_inactive text_type_main-small">Белки, г </p>
        <p className="text text_color_inactive text_type_digits-default">{props.proteins}</p>
      </li>
      <li className={`${styles.nutrient} text text_color_inactive`}>
        <p className="text text_color_inactive text_type_main-small">Жиры, г </p>
        <p className="text text_color_inactive text_type_digits-default">{props.fat}</p>
      </li>
      <li className={`${styles.nutrient} text text_color_inactive`}>
        <p className="text text_color_inactive text_type_main-small">Углеводы, г </p>
        <p className="text text_color_inactive text_type_digits-default">{props.carbohydrates}</p>
      </li>
    </ul>
    </>
  )
}

IngridientDetails.propTypes = {
  image_large: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
}


export default IngridientDetails
