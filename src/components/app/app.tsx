import React from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { HomePage } from "../../pages/home";
import { LoginPage } from "../../pages/login";
import { RegisterPage } from "../../pages/register";
import { ForgotPasswordPage } from "../../pages/forgot-password";
import { ResetPasswordPage } from "../../pages/reset-password";
function App() {
  return (
    <Router>
      <AppHeader />
      <Switch>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
        <Route path="/login" exact={true}>
          <LoginPage />
        </Route>
        <Route path="/register" exact={true}>
          <RegisterPage />
        </Route>
        <Route path="/forgot-password" exact={true}>
          <ForgotPasswordPage />
        </Route>
        <Route path="/reset-password" exact={true}>
          <ResetPasswordPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
