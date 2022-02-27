import {memo} from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './IngredientsTypeSelection.module.css';
import {IngredientType} from "constants/ingredientType";
import {useAppDispatch, useAppSelector} from "../../../services/hooks";
import {SET_CURRENT_TAB} from "../../../services/reducers/burgerIngredientsSlice";

type TIngredientsTypeSelectionProps = {
  click: (value :string) => void
}

const IngredientsTypeSelection = memo(({click}: TIngredientsTypeSelectionProps) => {
    const current = useAppSelector(state => state.burgerIngredients.currentTab);
    const dispatch = useAppDispatch();
    const tabClick = (value: string) => {
        dispatch(SET_CURRENT_TAB(value as IngredientType));
        click(value);
    }
    return (
        <div className={`${styles.main}`}>
            <Tab value={IngredientType.BUN} active={current === IngredientType.BUN} onClick={tabClick}>
                Булки
            </Tab>
            <Tab value={IngredientType.SAUCE} active={current === IngredientType.SAUCE} onClick={tabClick}>
                Соусы
            </Tab>
            <Tab value={IngredientType.MAIN} active={current === IngredientType.MAIN} onClick={tabClick}>
                Начинки
            </Tab>
        </div>
    );
});

IngredientsTypeSelection.displayName = 'IngredientsTypeSelection';

export default IngredientsTypeSelection;
