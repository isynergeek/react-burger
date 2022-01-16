import IngredientsContent from "./IngredientsContent";
import IngredientsTypeSelection from "./IngredientsTypeSelection";
import IngredientCard from "./IngredientCard";
import styles from './BurgerIngredients.module.css';
import {IngredientTypes} from "../../constants/ingredientTypes";
import Modal from "../modal/Modal";
import IngredientDetails, {IngredientDetailsPropsType} from "../ingredient-details/IngredientDetails";
import {memo, useCallback, useRef, useState} from "react";


type IngredientDetailsModalPropsType = IngredientDetailsPropsType & {
    onClose: Function
};

const IngredientDetailsModal = (props: IngredientDetailsModalPropsType) => {
    const {onClose} = props;
    return (
        <Modal close={onClose}>
            <IngredientDetails {...props}/>
        </Modal>
    );
}

type IngredientsListByTypePropsType = {
    type: string,
    data: Ingredient[],
    onItemClick: Function
}

const IngredientsListByType = memo((props: IngredientsListByTypePropsType) => {
    const {type, data, onItemClick} = props;
    const cards = data.filter(item => item.type === type)
        .map(item =>
            (
                <IngredientCard key={item._id}
                                image={item.image}
                                price={item.price}
                                name={item.name}
                                itemClick={() => onItemClick(item)}
                />
            ));
    return (
        <>{cards}</>
    );
})

type BurgerIngredientsPropsType = {
    ingredients: Ingredient[]
}

const BurgerIngredients = (props: BurgerIngredientsPropsType) => {
    const {ingredients} = props;
    const [detailsModalVisible, setDetailsModalVisible] = useState(false);

    const [selectedItem, setSelectedItem] = useState<Ingredient>({} as Ingredient);

    const selectItem = useCallback((item) => {
        setSelectedItem(item);
        setDetailsModalVisible(true);
    }, []);

    const mainRef = useRef<HTMLDivElement>(null);
    const bunRef = useRef<HTMLDivElement>(null);
    const sauceRef = useRef<HTMLDivElement>(null);


    const scrollToSection = (section: string) => {
        if (section === IngredientTypes.BUN  && bunRef.current) {
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
            <div className="text_type_main-large mb-5 mt-10">Соберите бурег</div>
            <IngredientsTypeSelection click={scrollToSection}/>
            <div className={`${styles.contentWrap} custom-scroll`}>
                <IngredientsContent title="Булки" ref={bunRef}>
                    <IngredientsListByType type={IngredientTypes.BUN}
                                           data={ingredients}
                                           onItemClick={selectItem}/>
                </IngredientsContent>

                <IngredientsContent title="Соусы" ref={sauceRef}>
                    <IngredientsListByType type={IngredientTypes.SAUCE}
                                           data={ingredients}
                                           onItemClick={selectItem}/>
                </IngredientsContent>

                <IngredientsContent title="Начинка" ref={mainRef}>
                    <IngredientsListByType type={IngredientTypes.MAIN}
                                           data={ingredients}
                                           onItemClick={selectItem}/>
                </IngredientsContent>
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
