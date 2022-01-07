import React from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './IngredientsTypeSelection.module.css';
import {IngredientTypes} from "../../constants/ingredientTypes";

const IngredientsTypeSelection = () => {
    const defaultType: string = IngredientTypes.BUN;
    const [current, setCurrent] = React.useState(defaultType)

    return (
        <div className={`${styles.main}`}>
            <Tab value={IngredientTypes.BUN} active={current === IngredientTypes.BUN} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value={IngredientTypes.SAUCE} active={current === IngredientTypes.SAUCE} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value={IngredientTypes.MAIN} active={current === IngredientTypes.MAIN} onClick={setCurrent}>
                Начинки
            </Tab>
        </div>
    );
};

export default IngredientsTypeSelection;
