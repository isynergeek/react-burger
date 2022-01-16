import React, {memo} from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './IngredientsTypeSelection.module.css';
import {IngredientTypes} from "../../constants/ingredientTypes";

type IngredientsTypeSelectionPropsType = {
    click: Function
}

const IngredientsTypeSelection = memo((props: IngredientsTypeSelectionPropsType) => {
    const [current, setCurrent] = React.useState<string>(IngredientTypes.BUN)
    const tabClick = (value: string) => {
        setCurrent(value);
        props.click(value);
    }
    return (
        <div className={`${styles.main}`}>
            <Tab value={IngredientTypes.BUN} active={current === IngredientTypes.BUN} onClick={tabClick}>
                Булки
            </Tab>
            <Tab value={IngredientTypes.SAUCE} active={current === IngredientTypes.SAUCE} onClick={tabClick}>
                Соусы
            </Tab>
            <Tab value={IngredientTypes.MAIN} active={current === IngredientTypes.MAIN} onClick={tabClick}>
                Начинки
            </Tab>
        </div>
    );
});

export default IngredientsTypeSelection;
