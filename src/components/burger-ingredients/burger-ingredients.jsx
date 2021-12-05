import { React, useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import styles from "./burger-ingredients.module.css";
import BurgerTabs from "../burger-tabs/burger-tabs";
import Ingredient from "../ingredient/ingredient";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { getItems } from "../../services/actions/ingredients";
import Modal from "../modal/modal";

const BurgerIngredients = () => {

  const [currentIngredient, setCurrentIngredient] = useState(null);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems())
  }, [dispatch])

  const { items } = useSelector(state => state.ingredients);

  const pickIngredientById = (currentId) => {
    return items.find((el) => el._id === currentId);
  };

  const openModal = () => {
    setIsModalOpened(true);
  };

  const closeModal = () => {
    setIsModalOpened(false);
  };

  const showIngredient = (evt) => {
    setCurrentIngredient(pickIngredientById(evt.currentTarget.id));
    openModal();
  };

  const bunsArray = useMemo(() => items.filter(el => el.type === "bun"), [items]);
  const mainArray = useMemo(() => items.filter(el => el.type === "main"), [items]);
  const sauceArray = useMemo(() => items.filter(el => el.type === "sauce"), [items]);

  const renderIngredient = (el) => {
    return (
      <li key={el._id} id={el._id} className={styles.item} onClick={showIngredient}>
        <Ingredient
          image={el.image}
          name={el.name}
          price={el.price}
          counter={el.counter}
        ></Ingredient>
      </li>
    );
  };

  return (
    <>
      <section className={styles.section}>
        <h1 className={`text text_type_main-large ${styles.title} pt-10 pb-5`}>
          Соберите бургер
        </h1>
        <BurgerTabs />
        <div className={styles.options}>
          <div className={styles.layer}>
            <h2
              className={`text text_type_main-medium ${styles.component} pt-10 pb-6`}
            >
              Булки
            </h2>
            <ul className={`${styles.list} pl-4 pr-2`}>
              {bunsArray.map(renderIngredient)}
            </ul>
          </div>
          <div className={styles.layer}>
            <h2
              className={`text text_type_main-medium ${styles.component} pt-10 pb-6`}
            >
              Соусы
            </h2>
            <ul className={`${styles.list} pl-4 pr-2`}>
              {sauceArray.map(renderIngredient)}
            </ul>
          </div>
          <div className={styles.layer}>
            <h2
              className={`text text_type_main-medium ${styles.component} pt-10 pb-6`}
            >
              Начинки
            </h2>
            <ul className={`${styles.list} pl-4 pr-2`}>
              {mainArray.map(renderIngredient)}
            </ul>
          </div>
        </div>
      </section>
      {isModalOpened && (
        <Modal onClose={closeModal}>
          <IngredientDetails
            image_large={currentIngredient.image_large}
            name={currentIngredient.name}
            calories={currentIngredient.calories}
            proteins={currentIngredient.proteins}
            fat={currentIngredient.fat}
            carbohydrates={currentIngredient.carbohydrates}
          ></IngredientDetails>
        </Modal>
      )}
    </>
  );
};

export default BurgerIngredients;
