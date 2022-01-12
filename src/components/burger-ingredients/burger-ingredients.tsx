import React,{
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  SEND_TO_MODAL,
  RESET_CURRENT_INGREDIENT,
} from "../../services/actions/ingredients";
import styles from "./burger-ingredients.module.css";
import Ingredient from "../ingredient/ingredient";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { getItems } from "../../services/actions/ingredients";
import Modal from "../modal/modal";
import { ICoordinates } from "../../utils/interfaces";

const BurgerIngredients : React.FC = () => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [current, setCurrent] = useState<string>("one");

  const bunRef = useRef<HTMLHeadingElement | null>(null)
  const sauceRef = useRef<HTMLHeadingElement | null>(null)
  const mainRef = useRef<HTMLHeadingElement | null>(null)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const {
    ingredientItems,
    ingredientItemsRequest,
    ingredientItemsFailed,
    ingredientItemsError,
  } = useSelector((state) => state.ingredients);

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

  const showIngredient = (evt: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setCurrentIngredient(evt.currentTarget.id);
    openModal();
  };

  const handleScroll = useCallback((e) => {

    const mainBlockTopCoordinate = e.target.getBoundingClientRect().top;

    const getCoordinates = (ref: React.MutableRefObject<HTMLHeadingElement>): ICoordinates => {
      return {
        top: ref.current.parentNode.getBoundingClientRect().top,
        bottom: ref.current.parentNode.getBoundingClientRect().bottom,
      };
    };

    const isInView = (coordinates: ICoordinates) => {
      return (
        coordinates.top - mainBlockTopCoordinate / 2 <=
          mainBlockTopCoordinate &&
        coordinates.bottom - mainBlockTopCoordinate / 2 > mainBlockTopCoordinate
      );
    };
    const sauceHeaderCoordinates = getCoordinates(sauceRef);
    const mainHeaderCoordinates = getCoordinates(mainRef);

    if (isInView(sauceHeaderCoordinates)) {
      setCurrent("two");
    } else if (isInView(mainHeaderCoordinates)) {
      setCurrent("three");
    } else setCurrent("one");
  }, []);

  const renderIngredient = (el) => {
    return (
      <li
        key={el._id}
        id={el._id}
        className={styles.item}
        onClick={showIngredient}
      >
        <Ingredient
          ingType={el.type}
          id={el._id}
          image={el.image}
          name={el.name}
          price={el.price}
        ></Ingredient>
      </li>
    );
  };

  const content = useMemo(() => {
    if (ingredientItemsRequest)
      return (
        <p className={`${styles.message} text text_type_main-large`}>
          Загрузка...
        </p>
      );
    else if (ingredientItemsFailed)
      return (
        <p className={`${styles.message} mt-20 text text_type_main-large`}>
          Произошла ошибка! Код ошибки: {ingredientItemsError}
        </p>
      );
    else
      return (
        <div className={styles.options} onScroll={handleScroll}>
          <div className={styles.layer}>
            <h2
              ref={bunRef}
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
            <h2
              ref={sauceRef}
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
            <h2
              ref={mainRef}
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
  }, [
    ingredientItemsRequest,
    ingredientItems,
    ingredientItemsError,
    ingredientItemsFailed,
    handleScroll,
  ]);

  return (
    <>
      <section className={styles.section}>
        <h1 className={`text text_type_main-large ${styles.title} pt-10 pb-5`}>
          Соберите бургер
        </h1>
        <div style={{ display: "flex" }}>
          <Tab
            value="one"
            active={current === "one"}
            onClick={(value) => {
              setCurrent(value);
              bunRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Булки
          </Tab>
          <Tab
            value="two"
            active={current === "two"}
            onClick={(value) => {
              setCurrent(value);
              sauceRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Соусы
          </Tab>
          <Tab
            value="three"
            active={current === "three"}
            onClick={(value) => {
              setCurrent(value);
              mainRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Начинки
          </Tab>
        </div>
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
