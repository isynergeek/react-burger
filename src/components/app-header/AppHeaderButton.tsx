import styles from './AppHeaderButton.module.css';
import React from "react";
import PropTypes from "prop-types";

interface AppHeaderButtonPropsType {
    text: string;
    children: JSX.Element,
    active?: boolean
}

const AppHeaderButton = (props: AppHeaderButtonPropsType) => {
    const {text, children, active} = props;
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

AppHeaderButton.propTypes = {
    text: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    active: PropTypes.bool
}

export default AppHeaderButton;
