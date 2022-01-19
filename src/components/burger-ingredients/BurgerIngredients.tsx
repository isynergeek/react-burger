import IngredientsContent from "components/burger-ingredients/ingredients-content/IngredientsContent";
import IngredientsTypeSelection from "components/burger-ingredients/ingredients-type-selection/IngredientsTypeSelection";
import styles from './BurgerIngredients.module.css';
import {IngredientTypes} from "constants/ingredientTypes";
import Modal from "../modal/Modal";
import IngredientDetails, {TIngredientDetails} from "components/ingredient-details/IngredientDetails";
import {useCallback, useRef, useState} from "react";
import {TIngredient} from "components/app/App";


type TIngredientDetailsModalProps = TIngredientDetails & {
    onClose: Function
};

const IngredientDetailsModal = (props: TIngredientDetailsModalProps) => {
    const {onClose} = props;
    return (
        <Modal close={onClose}>
            <IngredientDetails {...props}/>
        </Modal>
    );
}

type BurgerIngredientsProps = {
    ingredients: TIngredient[]
}

const BurgerIngredients = ({ingredients}: BurgerIngredientsProps) => {
    const [detailsModalVisible, setDetailsModalVisible] = useState(false);

    const [selectedItem, setSelectedItem] = useState<TIngredient>({} as TIngredient);

    const selectItem = useCallback((item) => {
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
            <IngredientsTypeSelection click={scrollToSection}/>
            <div className={`${styles.contentWrap} custom-scroll`}>
                <IngredientsContent
                    title="Булки"
                    ingredients={ingredients}
                    ingredientType={IngredientTypes.BUN}
                    onItemClick={selectItem}
                    ref={bunRef} />

                <IngredientsContent
                    title="Соусы"
                    ingredients={ingredients}
                    ingredientType={IngredientTypes.SAUCE}
                    onItemClick={selectItem}
                    ref={sauceRef} />

                <IngredientsContent
                    title="Начинка"
                    ingredients={ingredients}
                    ingredientType={IngredientTypes.MAIN}
                    onItemClick={selectItem}
                    ref={mainRef} />
            </div>
            {detailsModalVisible &&
                <IngredientDetailsModal
                    onClose={() => setDetailsModalVisible(false)}
                    {...selectedItem} image={selectedItem['image_large']}/>
            }
        </section>
    )
}

export default BurgerIngredients;
