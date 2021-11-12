import React from 'react';
import {data,cart} from './components/utils/utils';
import AppHeader from './components/appHeader/appHeader';
import BurgerIngridients from './components/burgerIngridients/burgerIngridients';
import './App.css';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructor from './components/burgerConstructor/burgerConstructor';

function App() {
  return (
    <>
    <AppHeader />
    <main className='main'>
      <BurgerIngridients {...data}/>
      <BurgerConstructor {...cart}/>
    </main>

    </>
  );
}

export default App;
