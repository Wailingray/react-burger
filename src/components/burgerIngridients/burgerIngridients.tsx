import styles from './burgerIngridients.module.css';
import BurgerTabs from '../burgerTabs/burgerTabs';
import Ingridient from '../ingridient/ingridient';

const BurgerIngridients = () => {
  return (
    <section className={styles.section}>
      <h1 className={`text text_type_main-large ${styles.title} pt-10 pb-5`}>Соберите бургер</h1>
      <BurgerTabs />
      <h2 className={`text text_type_main-medium ${styles.component} pt-10 pb-6`}>Булки</h2>
      <ul className={`pl-16 pr-16`}>
        <li className="item">

        </li>
        <li className="item">

        </li>
      </ul>
    </section>

  )
}

export default BurgerIngridients;
