import styles from './AppHeader.module.css';
import {BurgerIcon, ListIcon, ProfileIcon, Logo} from '@ya.praktikum/react-developer-burger-ui-components'
import AppHeaderButton from "./AppHeaderButton";
import {CONSTRUCTOR_ITEM, ORDER_LIST_ITEM, PROFILE_ITEM} from "../../constants/navItems";
import AppHeaderLogo from "./AppHeaderLogo";

const AppHeader = (props: { activeItem: any; }) => {
    const {activeItem} = props;

    return (
        <header className={`${styles.header} pt-4 pb-4`}>
            <nav className={styles.nav}>
                <div className={styles.left}>
                    <AppHeaderButton text="Конструктор" active={activeItem === CONSTRUCTOR_ITEM}>
                        <BurgerIcon type={activeItem === CONSTRUCTOR_ITEM ? 'primary' : 'secondary'}/>
                    </AppHeaderButton>
                    <AppHeaderButton text="Лента заказов" active={activeItem === ORDER_LIST_ITEM}>
                        <ListIcon type={activeItem === ORDER_LIST_ITEM ? 'primary' : 'secondary'}/>
                    </AppHeaderButton>
                </div>
                <AppHeaderLogo/>
                <div className={styles.right}>
                    <AppHeaderButton text="Личный кабинет" active={activeItem === PROFILE_ITEM}>
                        <ProfileIcon type={activeItem === PROFILE_ITEM ? 'primary' : 'secondary'}/>
                    </AppHeaderButton>
                </div>

            </nav>
        </header>
    )
}

export default AppHeader;
