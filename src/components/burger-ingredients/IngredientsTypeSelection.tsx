import React from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './IngredientsTypeSelection.module.css';
import {BUN_TYPE, MAIN_TYPE, SAUCE_TYPE} from "../../constants/ingredientTypes";

const IngredientsTypeSelection = () => {
    const [current, setCurrent] = React.useState(BUN_TYPE)

    return (
        <div className={`${styles.main}`}>
            <Tab value={BUN_TYPE} active={current === BUN_TYPE} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value={SAUCE_TYPE} active={current === SAUCE_TYPE} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value={MAIN_TYPE} active={current === MAIN_TYPE} onClick={setCurrent}>
                Начинки
            </Tab>
        </div>
    );
};

export default IngredientsTypeSelection;
