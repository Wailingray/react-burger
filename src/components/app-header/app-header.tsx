import React, { FC } from "react";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";

const AppHeader: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <nav>
        <ul className={styles.navigation}>
          <li className={styles.item}>
            <a href="" className={`${styles.link} pt-4 pb-4 pl-5 pb-5`}>
              <BurgerIcon type="primary" />
              <p className="text text_type_main-default pl-2">Конструктор</p>
            </a>
          </li>
          <li className={styles.item}>
            <a href="" className={styles.link}>
              <ListIcon type="primary" />
              <p className="text text_type_main-default text_color_inactive pl-2">
                Лента заказов
              </p>
            </a>
          </li>
          <li className={styles.item}>
            <a href="" className={styles.link}>
              <ProfileIcon type="primary" />
              <p className="text text_type_main-default text_color_inactive pl-2">
                Личный кабинет
              </p>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
