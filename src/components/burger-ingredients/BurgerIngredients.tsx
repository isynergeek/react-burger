import IngredientsContent from "components/burger-ingredients/ingredients-content/IngredientsContent";
import IngredientsTypeSelection
    from "components/burger-ingredients/ingredients-type-selection/IngredientsTypeSelection";
import styles from './BurgerIngredients.module.css';
import {IngredientTypes} from "constants/ingredientTypes";
import Modal from "../modal/Modal";
import IngredientDetails, {TIngredientDetailsProps} from "components/ingredient-details/IngredientDetails";
import {useCallback, useContext, useRef, useState} from "react";
import {TIngredient} from "components/app/App";
import {IngredientContext} from "../../services/igredientContext";
import {BurgerConstructorContext} from "../../services/burgerConstructorContext";


type TIngredientDetailsModalProps = TIngredientDetailsProps & {
    onClose: Function
};

const IngredientDetailsModal = (props: TIngredientDetailsModalProps) => {
    const {onClose} = props;
    return (
        <Modal close={onClose}>
            <IngredientDetails {...props} />
        </Modal>
    );
}

const BurgerIngredients = () => {

    const ingredients = useContext(IngredientContext);
    const {dispatch} = useContext(BurgerConstructorContext);

    const [detailsModalVisible, setDetailsModalVisible] = useState(false);

    const [selectedItem, setSelectedItem] = useState<TIngredient>({} as TIngredient);

    /**
     * Временное решение для провеки добавления булки и ингредиентов используя Reduce и Context
     * @param item
     */
    const addIngredient = (item: TIngredient) => {
        if (item.type === IngredientTypes.BUN) {
            dispatch({type:"addBun", payload: item});
            return;
        }
            dispatch({type:"addItem", payload: item});
    }

    const selectItem = useCallback((item) => {
        addIngredient(item);
        setSelectedItem(item);
        setDetailsModalVisible(true);
    }, []);

    const mainRef = useRef<HTMLDivElement>(null);
    const bunRef = useRef<HTMLDivElement>(null);
    const sauceRef = useRef<HTMLDivElement>(null);

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
            <div className={`${styles.contentWrap} custom-scroll`}>
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
            {detailsModalVisible &&
            <IngredientDetailsModal
              onClose={() => setDetailsModalVisible(false)}
              {...selectedItem} image={selectedItem['image_large']} />
            }
        </section>
    )
}

export default BurgerIngredients;
