import React, { FC } from "react";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { NavLink } from "react-router-dom";

const AppHeader: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <nav>
        <ul className={styles.navigation}>
          <li className={styles.item}>
            <NavLink to={"/"} activeClassName={`${styles.activeLink}`} exact={true} className={`${styles.link}  pt-4 pb-4 pl-5 pb-5`}>
              <BurgerIcon type="primary" />
              <p className="text text_type_main-default pl-2">Конструктор</p>
            </NavLink>
          </li>
          <li className={styles.item}>
            <NavLink to={"/feed"} activeClassName={`${styles.activeLink}`} exact={true} className={`${styles.link}`}>
              <ListIcon type="primary" />
              <p className="text text_type_main-default pl-2">
                Лента заказов
              </p>
            </NavLink>
          </li>
          <li className={styles.item}>
            <NavLink to={"/profile"}  activeClassName={`${styles.activeLink}`} className={`${styles.link}`}>
              <ProfileIcon type="primary" />
              <p className="text text_type_main-default pl-2">
                Личный кабинет
              </p>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
