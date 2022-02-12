import React from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { HomePage } from "../../pages/home/home";
import { LoginPage } from "../../pages/login/login";
import { RegisterPage } from "../../pages/register/register";
import { ForgotPasswordPage } from "../../pages/forgot-password/forgot-password";
import { ResetPasswordPage } from "../../pages/reset-password/reset-password";
import { ProfilePage } from "../../pages/profile/profile";
import { ProtectedRoute } from "../HOC/protected-route";
import { Orders } from "../../pages/orders/orders";
import { IngredientPage } from "../ingredient-page/ingredient-page";
import { TLocationState } from "../../services/utils/interfaces";
import { FeedPage } from "../../pages/feed/feed";

const App: React.FC = () => {
  const location = useLocation<TLocationState>();
  const history = useHistory();
  const isPush = history.action === "PUSH";
  const background = isPush && location.state && location.state.background;

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
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
        <ProtectedRoute path="/profile" exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <Route path="/feed" exact={true}>
          <FeedPage />
        </Route>
        <ProtectedRoute path="/profile/orders" exact={true}>
          <Orders />
        </ProtectedRoute>
        <Route path="/ingredients/:id" exact={true}>
          <IngredientPage />
        </Route>
        <Route path='/feed/:id' exact>
          <OrderInfo  />
        </Route>
      </Switch>
    </>
  );
};

export default App;
