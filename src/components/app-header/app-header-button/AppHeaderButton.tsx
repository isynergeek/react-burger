import styles from './AppHeaderButton.module.css';

type TAppHeaderButtonProps = {
    text: string;
    children: JSX.Element,
    active?: boolean
}

const AppHeaderButton = ({text, children, active}: TAppHeaderButtonProps) => {
    const activeClass = active ? styles.button_state_active : '';

    return (
        <div className={`${styles.button} ${activeClass} pl-5 pr-5 pt-4 pb-4`}>
            <div className={styles.button__icon}>
                {children}
            </div>
            <div className="text text_type_main-default">
                {text}
            </div>
        </div>
    );
};

export default AppHeaderButton;

