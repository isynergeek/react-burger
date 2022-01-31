import IngredientsContent from "components/burger-ingredients/ingredients-content/IngredientsContent";
import IngredientsTypeSelection
    from "components/burger-ingredients/ingredients-type-selection/IngredientsTypeSelection";
import styles from './BurgerIngredients.module.css';
import {IngredientTypes} from "constants/ingredientTypes";
import Modal from "../modal/Modal";
import IngredientDetails, {TIngredientDetailsProps} from "components/ingredient-details/IngredientDetails";
import {SyntheticEvent, useCallback, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../services/hooks";
import { SET_CURRENT_TAB, IIngredient } from '../../services/reducers/burgerIngredientsSlice';
import {
    IIngredientDetailsState, REMOVE_DETAILS,
    SET_DETAILS
} from '../../services/reducers/ingredientDetailsSlice';


type TIngredientDetailsModalProps = TIngredientDetailsProps & {
    onClose: () => void
};


type TPositionType = {
    bunPosition: number,
    mainPosition: number,
    saucePosition: number,
    contentPosition: number
}

type TGetTheNearestIngredientType = (positionData: TPositionType) => IngredientTypes

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

    let type = IngredientTypes.BUN

    if (minDistance === mainDistance) {
        type = IngredientTypes.MAIN;
    }

    if (minDistance === sauceDistance) {
        type = IngredientTypes.SAUCE
    }
    return type;
}

const IngredientDetailsModal = (props: TIngredientDetailsModalProps) => {
    const {onClose} = props;
    return (
        <Modal close={onClose}>
            <IngredientDetails {...props} />
        </Modal>
    );
}

const BurgerIngredients = () => {

    const dispatch = useAppDispatch();
    const ingredients = useAppSelector(state => state.burgerIngredients.items);
    const ingredientDetails = useAppSelector(state => state.ingredientDetails);

    const [detailsModalVisible, setDetailsModalVisible] = useState(false);

    const selectItem = useCallback((item: IIngredient) => {
        const details: IIngredientDetailsState = {
            image: item.image_large,
            fat: item.fat,
            proteins: item.proteins,
            name: item.name,
            carbohydrates: item.carbohydrates,
            calories: item.calories
        };
        dispatch(SET_DETAILS(details));
        setDetailsModalVisible(true);
    }, []);
    const closeModal = useCallback(() => {
        setDetailsModalVisible(false);
        dispatch(REMOVE_DETAILS());
    },[]);

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
        if (section === IngredientTypes.BUN && bunRef.current) {
            bunRef.current.scrollIntoView({behavior: "smooth"})
        }
        if (section === IngredientTypes.MAIN && mainRef.current) {
            mainRef.current.scrollIntoView({behavior: "smooth"})
        }
        if (section === IngredientTypes.SAUCE && sauceRef.current) {
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
                    ingredients={ingredients.filter(item => item.type === IngredientTypes.BUN)}
                    onItemClick={selectItem}
                    ref={bunRef} />

                <IngredientsContent
                    title="Соусы"
                    ingredients={ingredients.filter(item => item.type === IngredientTypes.SAUCE)}
                    onItemClick={selectItem}
                    ref={sauceRef} />

                <IngredientsContent
                    title="Начинка"
                    ingredients={ingredients.filter(item => item.type === IngredientTypes.MAIN)}
                    onItemClick={selectItem}
                    ref={mainRef} />
            </div>
            { detailsModalVisible && <IngredientDetailsModal onClose={closeModal} {...ingredientDetails} /> }
        </section>
    )
}

export default BurgerIngredients;
