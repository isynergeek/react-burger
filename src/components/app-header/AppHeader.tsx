import styles from './AppHeader.module.css';
import {BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import AppHeaderButton from "components/app-header/app-header-button/AppHeaderButton";
import AppHeaderLogo from "components/app-header/app-header-logo/AppHeaderLogo";
import {useHistory, useLocation} from 'react-router-dom';
import ROUTES from "../../constants/routes";

enum AppHeaderButtonType {
    PROFILE,
    ORDER_FEED,
    CONSTRUCTOR,
}

const AppHeader = () => {
    const history = useHistory();
    const {pathname} = useLocation();

    const clickHandler = (type: AppHeaderButtonType) => {
        switch (type) {
            case AppHeaderButtonType.PROFILE: {
                history.push(ROUTES.PROFILE);
                return;
            }
            case AppHeaderButtonType.CONSTRUCTOR: {
                history.push(ROUTES.CONSTRUCTOR);
                return;
            }
            case AppHeaderButtonType.ORDER_FEED: {
                history.push(ROUTES.ORDER_FEED)
                return;
            }
        }
    }

    return (
        <header className={`${styles.header} pt-4 pb-4`}>
            <nav className={styles.nav}>
                <div className={styles.left}>
                    <AppHeaderButton text="Конструктор" active={pathname === ROUTES.CONSTRUCTOR}
                                     onClick={() => clickHandler(AppHeaderButtonType.CONSTRUCTOR)}>
                        <BurgerIcon type={pathname === ROUTES.CONSTRUCTOR ? 'primary' : 'secondary'} />
                    </AppHeaderButton>
                    <AppHeaderButton text="Лента заказов" active={pathname === ROUTES.ORDER_FEED}
                                     onClick={() => clickHandler(AppHeaderButtonType.ORDER_FEED)}>
                        <ListIcon type={pathname === ROUTES.ORDER_FEED ? 'primary' : 'secondary'} />
                    </AppHeaderButton>
                </div>
                <AppHeaderLogo onClick={() => clickHandler(AppHeaderButtonType.CONSTRUCTOR)}/>
                <div className={styles.right}>
                    <AppHeaderButton text="Личный кабинет" active={pathname === ROUTES.PROFILE}
                                     onClick={() => clickHandler(AppHeaderButtonType.PROFILE)}>
                        <ProfileIcon type={pathname === ROUTES.PROFILE ? 'primary' : 'secondary'} />
                    </AppHeaderButton>
                </div>
            </nav>
        </header>
    )
}

export default AppHeader;
