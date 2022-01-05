import IngredientsContent from "./IngredientsContent";
import IngredientsTypeSelection from "./IngredientsTypeSelection";
import IngredientCard from "./IngredientCard";
import styles from './BurgerIngredients.module.css';
import data from "../../utils/data";
import {BUN_TYPE, MAIN_TYPE, SAUCE_TYPE} from "../../constants/ingredientTypes";


const ingredientByType = (type: string) => {
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
                    {ingredientByType(BUN_TYPE)}
                </IngredientsContent>

                <IngredientsContent title="Соусы">
                    {ingredientByType(SAUCE_TYPE)}
                </IngredientsContent>

                <IngredientsContent title="Начинка">
                    {ingredientByType(MAIN_TYPE)}
                </IngredientsContent>
            </div>

        </section>
    )
}

export default BurgerIngredients;
