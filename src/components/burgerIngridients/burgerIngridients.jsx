import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./burgerIngridients.module.css";
import BurgerTabs from "../burgerTabs/burgerTabs";
import Ingridient from "../ingridient/ingridient";
import IngridientDetails from "../ingridientDetails/ingridientDetails";
import Modal from "../modal/modal";

const BurgerIngridients = (props) => {
  const [fullArray, setFullArray] = useState([]);
  const [bunsArray, setBunsArray] = useState([]);
  const [mainArray, setMainArray] = useState([]);
  const [sauceArray, setSauceArray] = useState([]);
  const [currentIngridient, setCurrentIngridient] = useState(null);
  const [isModalOpened, setIsModalOpened] = useState(false);


  const pickIngridientById = (currentId) => {
    return fullArray.find((el) => el._id === currentId);
  };

  const openModal = () => {
    setIsModalOpened(true);
  };

  const closeModal = () => {
    setIsModalOpened(false);
  };

  const showIngridient = (evt) => {
    setCurrentIngridient(pickIngridientById(evt.currentTarget.id));
    openModal();
  };

  useEffect(() => {
    setFullArray(props.data.map(el => el));
    setBunsArray(props.data.filter((el) => el.type === "bun"));
    setMainArray(props.data.filter((el) => el.type === "main"));
    setSauceArray(props.data.filter((el) => el.type === "sauce"));
  }, [props.data]);

  const renderIngridient = (el) => {
    return (
      <li key={el._id} id={el._id} className={styles.item} onClick={showIngridient}>
        <Ingridient
          image={el.image}
          name={el.name}
          price={el.price}
          counter={el.counter}
        ></Ingridient>
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
              {bunsArray.map(renderIngridient)}
            </ul>
          </div>
          <div className={styles.layer}>
            <h2
              className={`text text_type_main-medium ${styles.component} pt-10 pb-6`}
            >
              Соусы
            </h2>
            <ul className={`${styles.list} pl-4 pr-2`}>
              {sauceArray.map(renderIngridient)}
            </ul>
          </div>
          <div className={styles.layer}>
            <h2
              className={`text text_type_main-medium ${styles.component} pt-10 pb-6`}
            >
              Начинки
            </h2>
            <ul className={`${styles.list} pl-4 pr-2`}>
              {mainArray.map(renderIngridient)}
            </ul>
          </div>
        </div>
      </section>
      {isModalOpened && (
        <Modal isOpened={isModalOpened} onClose={closeModal}>
          <IngridientDetails
            image_large={currentIngridient.image_large}
            name={currentIngridient.name}
            calories={currentIngridient.calories}
            proteins={currentIngridient.proteins}
            fat={currentIngridient.fat}
            carbohydrates={currentIngridient.carbohydrates}
          ></IngridientDetails>
        </Modal>
      )}
    </>
  );
};

BurgerIngridients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(PropTypes.IngridientPropTypes))
    .isRequired,
};

export default BurgerIngridients;
