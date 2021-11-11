import styles from './burgerIngridients.module.css';
import BurgerTabs from '../burgerTabs/burgerTabs';
import Ingridient from '../ingridient/ingridient';

const BurgerIngridients = (props) => {
  return (
    <section className={styles.section}>
      <h1 className={`text text_type_main-large ${styles.title} pt-10 pb-5`}>Соберите бургер</h1>
      <BurgerTabs />
      <div className={styles.layer}>
        <h2 className={`text text_type_main-medium ${styles.component} pt-10 pb-6`}>Булки</h2>
        <ul className={`${styles.list} pl-4 pr-2`}>
          <li className="item">
            <Ingridient {...props[0]}></Ingridient>
          </li>
          <li className="item">
            <Ingridient {...props[14]}></Ingridient>
          </li>
        </ul>
      </div>
      <div className={styles.layer}>
        <h2 className={`text text_type_main-medium ${styles.component} pt-10 pb-6`}>Соусы</h2>
        <ul className={`${styles.list} pl-4 pr-2`}>
          <li className="item">
            <Ingridient {...props[3]}></Ingridient>
          </li>
          <li className="item">
            <Ingridient {...props[6]}></Ingridient>
          </li>
          <li className="item">
            <Ingridient {...props[5]}></Ingridient>
          </li>
          <li className="item">
            <Ingridient {...props[9]}></Ingridient>
          </li>
        </ul>
      </div>
      <div className={styles.layer}>
      <h2 className={`text text_type_main-medium ${styles.component} pt-10 pb-6`}>Начинки</h2>
      <ul className= {`${styles.list} pl-4 pr-2`}>
        <li className="item">
          <Ingridient {...props[1]}></Ingridient>
        </li>
        <li className="item">
          <Ingridient {...props[2]}></Ingridient>
        </li>
        <li className="item">
          <Ingridient {...props[4]}></Ingridient>
        </li>
        <li className="item">
          <Ingridient {...props[12]}></Ingridient>
        </li>
        <li className="item">
          <Ingridient {...props[8]}></Ingridient>
        </li>
        <li className="item">
          <Ingridient {...props[10]}></Ingridient>
        </li>
        <li className="item">
          <Ingridient {...props[11]}></Ingridient>
        </li>
        <li className="item">
          <Ingridient {...props[7]}></Ingridient>
        </li>
        <li className="item">
          <Ingridient {...props[13]}></Ingridient>
        </li>
      </ul>
    </div>
    </section>

  )
}

export default BurgerIngridients;
