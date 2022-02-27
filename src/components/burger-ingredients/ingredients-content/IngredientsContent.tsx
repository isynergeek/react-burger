import styles from './IngredientsContent.module.css';
import { forwardRef, LegacyRef } from 'react';
import IngredientCard from 'components/burger-ingredients/ingredient-card/IngredientCard';
import { IRawIngredient } from '../../../services/reducers/burgerIngredientsSlice';

type TIngredientsContentProps = {
  title: string,
  ingredients: IRawIngredient[],
  onItemClick: (item: IRawIngredient) => void
}

const IngredientsContent = forwardRef(({ title, ingredients, onItemClick }: TIngredientsContentProps, ref: LegacyRef<HTMLDivElement>) => {
  return (
    <section className="mt-10">
      <div className="text text_type_main-medium" ref={ref}>{title}</div>
      <div className="pt-6 pl-4">
        <div className={styles.contentItems}>
          {ingredients.map(item =>
            (<IngredientCard key={item._id}
                             id={item._id}
                             image={item.image}
                             price={item.price}
                             name={item.name}
                             itemClick={() => onItemClick(item)}
            />)
          )}
        </div>
      </div>
    </section>
  );
});
IngredientsContent.displayName = 'IngredientsContent';

export default IngredientsContent;
