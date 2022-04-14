import styles from './IngredientDetails.module.css';
import { useAppSelector } from '../../services/hooks';
import { useParams } from 'react-router-dom';

type TIngredientDetailBlockProps = {
    name: string,
    value: number
}

const DetailBlock = ({name, value}: TIngredientDetailBlockProps) => {
    return (
            <section className={styles.DetailBlock}>
                <div className="text text_type_main-default">{name}</div>
                <div className="text text_type_digits-default">{value}</div>
            </section>
    );
}

const IngredientDetails = () => {
  const { ingredientId } = useParams<{ingredientId: string}>();
  const item = useAppSelector(state => {
    return state.burgerIngredients.items.find(item => item._id === ingredientId);
  })
  if (!item) {
    return null;
  }
  const {calories, carbohydrates, fat, proteins, name, image_large: image} = item;

  return (
    <section className={styles.Root}>
      <div className={styles.Content}>
        <div className={`text text_type_main-large`}>Детали ингредиента</div>
        <img className="mb-4" src={image} alt={name}/>
        <div className="mb-8 text text_type_main-medium">{name}</div>
        <div className={`${styles.DetailBlockRow} mb-5`}>
          <DetailBlock name="Калории,ккал" value={calories}/>
          <DetailBlock name="Белки, г" value={proteins}/>
          <DetailBlock name="Жиры, г" value={fat}/>
          <DetailBlock name="Углеводы, г" value={carbohydrates}/>
        </div>
      </div>
    </section>
  );
};

export default IngredientDetails;
