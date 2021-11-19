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
  const userCart = items.map((el) => el);
  userCart[userCart.length - 1] = userCart[0];
  //убираем булки из середины
  const filteredCart = userCart.filter((el, idx, arr) => {
    if (idx ===0 || idx === arr.length-1) {
      return el
    }
    else {
      if (el.type !== 'bun') return el
    }
  })

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((result) => {
        setLoaded(true);
        setItems(result.data);
      })
      .catch((err) => {
        setLoaded(true);
        setError(err);
      });
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
          <BurgerConstructor cart={filteredCart} />
        </main>
      </>
    );
}

export default App;
