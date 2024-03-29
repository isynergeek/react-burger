import IngredientsContent from "components/burger-ingredients/ingredients-content/IngredientsContent";
import IngredientsTypeSelection
    from "components/burger-ingredients/ingredients-type-selection/IngredientsTypeSelection";
import styles from './BurgerIngredients.module.css';
import {IngredientType} from "constants/ingredientType";
import {SyntheticEvent, useCallback, useRef} from "react";
import {useAppDispatch, useAppSelector} from "../../services/hooks";
import { SET_CURRENT_TAB, IRawIngredient } from '../../services/reducers/burgerIngredientsSlice';
import { useHistory, useLocation } from 'react-router-dom';
import ROUTES from '../../constants/routes';

type TPositionType = {
    bunPosition: number,
    mainPosition: number,
    saucePosition: number,
    contentPosition: number
}

type TGetTheNearestIngredientType = (positionData: TPositionType) => IngredientType

const getTheNearestType: TGetTheNearestIngredientType = ({
                                                             mainPosition,
                                                             bunPosition,
                                                             saucePosition,
                                                             contentPosition
                                                         }) => {

    const bunDistance = Math.abs(bunPosition - contentPosition);
    const mainDistance = Math.abs(mainPosition - contentPosition);
    const sauceDistance = Math.abs(saucePosition - contentPosition);

    const minDistance = Math.min(bunDistance, mainDistance, sauceDistance);

    let type = IngredientType.BUN

    if (minDistance === mainDistance) {
        type = IngredientType.MAIN;
    }

    if (minDistance === sauceDistance) {
        type = IngredientType.SAUCE
    }
    return type;
}

const BurgerIngredients = () => {

    const dispatch = useAppDispatch();
    const history = useHistory();
    const location = useLocation();
    const ingredients = useAppSelector(state => state.burgerIngredients.items);


    const selectItem = useCallback((item: IRawIngredient) => {
        history.push(`${ROUTES.INGREDIENTS}/${item._id}`, {background: location})
    }, []);

    const contentRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);
    const bunRef = useRef<HTMLDivElement>(null);
    const sauceRef = useRef<HTMLDivElement>(null);

    const getContentScroll = (e: SyntheticEvent) => {
        const {top: contentPosition} = e.currentTarget.getBoundingClientRect();
        let bunPosition = 0;
        let mainPosition = 0;
        let saucePosition = 0;

        if (bunRef.current) {
            bunPosition = bunRef.current.getBoundingClientRect().top;
        }

        if (mainRef.current) {
            mainPosition = mainRef.current.getBoundingClientRect().top;
        }

        if (sauceRef.current) {
            saucePosition = sauceRef.current.getBoundingClientRect().top;
        }

        const type = getTheNearestType({bunPosition, mainPosition, saucePosition, contentPosition})
        dispatch(SET_CURRENT_TAB(type));
    };

    const scrollToSection = (section: string) => {
        if (section === IngredientType.BUN && bunRef.current) {
            bunRef.current.scrollIntoView({behavior: "smooth"})
        }
        if (section === IngredientType.MAIN && mainRef.current) {
            mainRef.current.scrollIntoView({behavior: "smooth"})
        }
        if (section === IngredientType.SAUCE && sauceRef.current) {
            sauceRef.current.scrollIntoView({behavior: "smooth"})
        }
    }

    return (
        <section className={styles.Root}>
            <div className="text_type_main-large mb-5 mt-10">Соберите бургер</div>
            <IngredientsTypeSelection click={scrollToSection} />
            <div className={`${styles.contentWrap} custom-scroll`} ref={contentRef} onScroll={getContentScroll}>
                <IngredientsContent
                    title="Булки"
                    ingredients={ingredients.filter(item => item.type === IngredientType.BUN)}
                    onItemClick={selectItem}
                    ref={bunRef} />

                <IngredientsContent
                    title="Соусы"
                    ingredients={ingredients.filter(item => item.type === IngredientType.SAUCE)}
                    onItemClick={selectItem}
                    ref={sauceRef} />

                <IngredientsContent
                    title="Начинка"
                    ingredients={ingredients.filter(item => item.type === IngredientType.MAIN)}
                    onItemClick={selectItem}
                    ref={mainRef} />
            </div>
        </section>
    )
}

export default BurgerIngredients;
