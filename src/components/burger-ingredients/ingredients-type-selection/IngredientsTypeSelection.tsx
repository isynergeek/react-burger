import {memo} from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './IngredientsTypeSelection.module.css';
import {IngredientTypes} from "constants/ingredientTypes";
import {useAppDispatch, useAppSelector} from "../../../services/hooks";
import {SET_CURRENT_TAB} from "../../../services/reducers/burgerIngredientsSlice";

type TIngredientsTypeSelectionProps = {
  click: (value :string) => void
}

const IngredientsTypeSelection = memo(({click}: TIngredientsTypeSelectionProps) => {
    const current = useAppSelector(state => state.burgerIngredients.currentTab);
    const dispatch = useAppDispatch();
    const tabClick = (value: string) => {
        dispatch(SET_CURRENT_TAB(value as IngredientTypes));
        click(value);
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

IngredientsTypeSelection.displayName = 'IngredientsTypeSelection';

export default IngredientsTypeSelection;
