import { React, useState, useMemo, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import {
  SEND_TO_MODAL,
  RESET_CURRENT_INGREDIENT,
} from "../../services/actions/ingredients";
import styles from "./burger-ingredients.module.css";
import Ingredient from "../ingredient/ingredient";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { getItems } from "../../services/actions/ingredients";
import Modal from "../modal/modal";

const BurgerIngredients = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);


  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const { ingredientItems, ingredientItemsRequest, ingredientsItemFailed } =
    useSelector((state) => state.ingredients);

  const setCurrentIngredient = (id) => {
    dispatch({
      type: SEND_TO_MODAL,
      id,
    });
  };

  const resetCurrentIngredient = () => {
    dispatch({
      type: RESET_CURRENT_INGREDIENT,
    });
  };

  const openModal = () => {
    setIsModalOpened(true);
  };

  const closeModal = () => {
    setIsModalOpened(false);
    resetCurrentIngredient();
  };

  const showIngredient = (evt) => {
    setCurrentIngredient(evt.currentTarget.id);
    openModal();
  };

  const renderIngredient = (el) => {
    return (
      <li
        key={el._id}
        id={el._id}
        className={styles.item}
        onClick={showIngredient}
      >
        <Ingredient
          id={el._id}
          image={el.image}
          name={el.name}
          price={el.price}
          counter={el.counter}
        ></Ingredient>
      </li>
    );
  };

  const BurgerTabs = () => {
    const [current, setCurrent] = useState('one')
    return (
      <div style={{ display: 'flex' }}>
        <Tab value="one" active={current === 'one'} onClick={(value) => {
          setCurrent(value);
          bunRef.current.scrollIntoView(({behavior: "smooth"}));
        }} >
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={(value) => {
          setCurrent(value);
          sauceRef.current.scrollIntoView(({behavior: "smooth"}));
        }}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={(value) => {
          setCurrent(value);
          mainRef.current.scrollIntoView(({behavior: "smooth"}));
        }}>
          Начинки
        </Tab>
      </div>
    )
  }

  const content = useMemo(() => {
    return ingredientItemsRequest ? (
      <p className={`${styles.message} text text_type_main-large`}>
        Загрузка...
      </p>
    ) : (
      <div className={styles.options}>
        <div className={styles.layer}>
          <h2 ref={bunRef}
            className={`text text_type_main-medium ${styles.component} pt-10 pb-6`}
          >
            Булки
          </h2>
          <ul className={`${styles.list} pl-4 pr-2`}>
            {ingredientItems
              .filter((el) => el.type === "bun")
              .map(renderIngredient)}
          </ul>
        </div>
        <div className={styles.layer}>
          <h2 ref={sauceRef}
            className={`text text_type_main-medium ${styles.component} pt-10 pb-6`}
          >
            Соусы
          </h2>
          <ul className={`${styles.list} pl-4 pr-2`}>
            {ingredientItems
              .filter((el) => el.type === "sauce")
              .map(renderIngredient)}
          </ul>
        </div>
        <div className={styles.layer}>
          <h2 ref={mainRef}
            className={`text text_type_main-medium ${styles.component} pt-10 pb-6`}
          >
            Начинки
          </h2>
          <ul className={`${styles.list} pl-4 pr-2`}>
            {ingredientItems
              .filter((el) => el.type === "main")
              .map(renderIngredient)}
          </ul>
        </div>
      </div>
    );
  }, [ingredientItemsRequest, ingredientItems]);

  return (
    <>
      <section className={styles.section}>
        <h1 className={`text text_type_main-large ${styles.title} pt-10 pb-5`}>
          Соберите бургер
        </h1>
        <BurgerTabs />
        {content}
      </section>
      {isModalOpened && (
        <Modal onClose={closeModal}>
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
};

export default BurgerIngredients;
