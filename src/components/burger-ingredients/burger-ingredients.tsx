import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  sendToModal,
  resetCurrentIngredient,
} from "../../services/actions/ingredients";
import styles from "./burger-ingredients.module.css";
import Ingredient from "../ingredient/ingredient";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { getItems } from "../../services/actions/ingredients";
import Modal from "../modal/modal";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import { TIngredient } from "../../services/utils/types";
import { useHistory } from "react-router-dom";
import { Loader } from "../loader/loader";

const BurgerIngredients: React.FC = () => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [current, setCurrent] = useState<string>("one");

  const bunRef = useRef<HTMLHeadingElement | null>(null);
  const sauceRef = useRef<HTMLHeadingElement | null>(null);
  const mainRef = useRef<HTMLHeadingElement | null>(null);

  const dispatch = useAppDispatch();
  const history = useHistory()

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const {
    ingredientItems,
    ingredientItemsRequest,
    ingredientItemsFailed,
    ingredientItemsError,
  } = useAppSelector((state) => state.ingredients);

  const openModal = () => {
    setIsModalOpened(true);
  };

  const closeModal = () => {
    setIsModalOpened(false);
    dispatch(resetCurrentIngredient());
    history.goBack()
  };

  const showIngredient = (evt: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    dispatch(sendToModal(evt.currentTarget.id));
    openModal();
  };

  const handleScroll = useCallback((e) => {
    const mainBlockTopCoordinate = e.target.getBoundingClientRect().top;

    const getTopCoordinate = (
      ref: React.RefObject<HTMLHeadingElement> | null
    ): number => {
      if (ref !== null) return ref?.current?.getBoundingClientRect().top!;
      else return 0;
    };

    const getDistance = (topCoordinate: number) => {
      return Math.abs(topCoordinate - mainBlockTopCoordinate);
    };

    const sauceHeaderCoordinates = getTopCoordinate(sauceRef);
    const mainHeaderCoordinates = getTopCoordinate(mainRef);
    const bunHeaderCoordinates = getTopCoordinate(bunRef);

    const closestBlockCoord = Math.min(
      getDistance(sauceHeaderCoordinates)!,
      getDistance(mainHeaderCoordinates)!,
      getDistance(bunHeaderCoordinates)!
    );

    if (closestBlockCoord === getDistance(sauceHeaderCoordinates)) {
      setCurrent("two");
    } else if (closestBlockCoord === getDistance(mainHeaderCoordinates)) {
      setCurrent("three");
    } else setCurrent("one");
  }, []);

  const renderIngredient = (el: TIngredient) => {
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
      return <Loader />;
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
