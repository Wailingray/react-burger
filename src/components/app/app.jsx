import { React, useEffect, useState } from "react";

import { getData } from "../api/api";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngridients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import ConstructorContext from "../../context/constructor-context";

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
      else return false
    }
  })


  useEffect(() => {
    getData()
      .then((res) => {
        setLoaded(true);
        setItems(res.data);
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
          <ConstructorContext.Provider value={filteredCart}>
            <BurgerConstructor />
          </ConstructorContext.Provider>
        </main>
      </>
    );
}

export default App;
