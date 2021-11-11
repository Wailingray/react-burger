import React from 'react';
import data from './components/utils/utils';
import AppHeader from './components/appHeader/appHeader';
import BurgerIngridients from './components/burgerIngridients/burgerIngridients';
import './App.css';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function App() {
  return (
    <>
    <AppHeader />
    <main className='main'>
      <BurgerIngridients {...data}/>
      <BurgerIngridients {...data}/>
    </main>

    </>
  );
}

export default App;
