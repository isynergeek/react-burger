import styles from './IngredientsContent.module.css';
import React, {LegacyRef} from "react";
import {IngredientTypes} from "constants/ingredientTypes";
import IngredientCard from "components/burger-ingredients/ingredient-card/IngredientCard";
import {TIngredient} from "components/app/App";

type TIngredientsContentProps ={
    title: string,
    ingredients: TIngredient[],
    ingredientType: IngredientTypes,
    onItemClick: Function
}

const IngredientsContent = React.forwardRef(({
                                                 title,
                                                 ingredients,
                                                 onItemClick,
                                                 ingredientType
                                             }: TIngredientsContentProps, ref: LegacyRef<HTMLDivElement>) => {
    return (
        <section className="mt-10">
            <div className="text text_type_main-medium" ref={ref}>{title}</div>
            <div className="pt-6 pl-4">
                <div className={styles.contentItems}>
                    {
                        ingredients.filter(item => item.type === ingredientType)
                            .map(item => (
                                    <IngredientCard key={item._id}
                                                    image={item.image}
                                                    price={item.price}
                                                    name={item.name}
                                                    itemClick={() => onItemClick(item)}
                                    />
                                )
                            )
                    }
                </div>
            </div>
        </section>
    );
});

export default IngredientsContent;
