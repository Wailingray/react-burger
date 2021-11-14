import React from 'react';
import {data,cart} from '../utils/utils';
import styles from './app.module.css';
import AppHeader from '../appHeader/appHeader';
import BurgerIngridients from '../burgerIngridients/burgerIngridients';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';

function App() {
  return (
    <>
    <AppHeader />
    <main className={styles.main}>
      <BurgerIngridients data={data}/>
      <BurgerConstructor cart={cart}/>
    </main>

    </>
  );
}

export default App;
