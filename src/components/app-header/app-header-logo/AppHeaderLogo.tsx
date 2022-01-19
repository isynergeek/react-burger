import styles from './AppHeaderLogo.module.css';
import {Logo} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeaderLogo = () => {
    return (
        <div className={styles.logo}>
            <Logo/>
        </div>
    );
};

export default AppHeaderLogo;
