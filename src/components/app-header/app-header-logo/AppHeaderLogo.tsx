import styles from './AppHeaderLogo.module.css';
import {Logo} from "@ya.praktikum/react-developer-burger-ui-components";


const AppHeaderLogo = ({onClick}: { onClick: () => void }) => {
    return (
        <div className={styles.logo} onClick={onClick}>
            <Logo />
        </div>
    );
};

export default AppHeaderLogo;
