import { React, useEffect, useState } from "react";
import { apiUrl } from "../utils/utils";
import styles from "./app.module.css";
import AppHeader from "../appHeader/appHeader";
import BurgerIngridients from "../burgerIngridients/burgerIngridients";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";

function App() {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [items, setItems] = useState([]);

  //массив, который будет заполнятсья у пользователя
  const userCart = items.map(el => el)
  userCart[userCart.length-1] = userCart[0]

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then(
        (result) => {
          setLoaded(true);
          setItems(result.data);
        },
        (err) => {
          setLoaded(true);
          setError(err);
        }
      );
  }, []);

  if (error) {
    return (
      <p className={`${styles.message} text text_type_main-large`}>
        Ошибка: {error}
      </p>
    );
  } else if (!loaded) {
    return (
      <p className={`${styles.message} text text_type_main-large`}>
        Загрузка...
      </p>
    );
  } else
    return (
      <>
        <AppHeader />
        <main className={styles.main}>
          <BurgerIngridients data={items} />
          <BurgerConstructor cart={userCart} />
        </main>
      </>
    );
}

export default App;
