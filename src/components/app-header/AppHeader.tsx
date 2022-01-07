import styles from './AppHeader.module.css';
import {BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import AppHeaderButton from "./AppHeaderButton";
import {NavItems} from "../../constants/navItems";
import AppHeaderLogo from "./AppHeaderLogo";
import PropTypes from "prop-types";

interface AppHeaderPropsType {
    activeItem: NavItems
}

const AppHeader = (props: AppHeaderPropsType) => {
    const {activeItem} = props;

    return (
        <header className={`${styles.header} pt-4 pb-4`}>
            <nav className={styles.nav}>
                <div className={styles.left}>
                    <AppHeaderButton text="Конструктор" active={activeItem === NavItems.CONSTRUCTOR}>
                        <BurgerIcon type={activeItem === NavItems.CONSTRUCTOR ? 'primary' : 'secondary'}/>
                    </AppHeaderButton>
                    <AppHeaderButton text="Лента заказов" active={activeItem === NavItems.ORDER_LIST}>
                        <ListIcon type={activeItem === NavItems.ORDER_LIST ? 'primary' : 'secondary'}/>
                    </AppHeaderButton>
                </div>
                <AppHeaderLogo/>
                <div className={styles.right}>
                    <AppHeaderButton text="Личный кабинет" active={activeItem === NavItems.PROFILE}>
                        <ProfileIcon type={activeItem === NavItems.PROFILE ? 'primary' : 'secondary'}/>
                    </AppHeaderButton>
                </div>

            </nav>
        </header>
    )
}

AppHeader.propTypes = {
    activeItem: PropTypes.string.isRequired
}

export default AppHeader;
