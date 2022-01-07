import IngredientsContent from "./IngredientsContent";
import IngredientsTypeSelection from "./IngredientsTypeSelection";
import IngredientCard from "./IngredientCard";
import styles from './BurgerIngredients.module.css';
import data from "../../utils/data";
import {IngredientTypes} from "../../constants/ingredientTypes";

const ingredientByType = (type: IngredientTypes) => {
    return data.filter(item => item.type === type)
        .map(item => (
            <IngredientCard key={item._id} image={item.image} price={item.price} name={item.name}/>
        ));
}

const BurgerIngredients = () => {
    return (
        <section>
            <div className="text_type_main-large mb-5 mt-10">Соберите бурег</div>
            <IngredientsTypeSelection/>
            <div className={`${styles.contentWrap} custom-scroll`}>
                <IngredientsContent title="Булки">
                    {ingredientByType(IngredientTypes.BUN)}
                </IngredientsContent>

                <IngredientsContent title="Соусы">
                    {ingredientByType(IngredientTypes.SAUCE)}
                </IngredientsContent>

                <IngredientsContent title="Начинка">
                    {ingredientByType(IngredientTypes.MAIN)}
                </IngredientsContent>
            </div>
        </section>
    )
}

export default BurgerIngredients;
