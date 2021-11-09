import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './appHeader.module.css';

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}><Logo/></div>
      <nav>
        <ul className={styles.navigation}>
          <li className={styles.item}>
            <a href="" className={styles.link}>
              <BurgerIcon type="primary"/>
              <p className={styles.linkTitle}>Конструктор</p>
            </a>
          </li>
          <li className={styles.item}>
            <a href="" className={styles.link}>
              <ListIcon type="primary"/>
              <p className={styles.linkTitle}>Лента заказов</p>
            </a>
          </li>
          <li className={styles.item}>
            <a href="" className={styles.link}>
              <ProfileIcon type="primary"/>
              <p className={styles.linkTitle}>Личный кабинет</p>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader;
