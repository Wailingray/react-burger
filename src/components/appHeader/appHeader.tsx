import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const AppHeader = () => {
  return (
    <header className="header">
      <div className="logo">
        <Logo />
        <h1 className="title">stellar burgers</h1>
      </div>
      <nav className="navigation">
        <a href="" className="constructor-link">Конструктор</a>
        <a href="" className="orders-link">Лента заказов</a>
        <a href="" className="account">Личный кабинет</a>
      </nav>


    </header>
  )
}

export default AppHeader;
