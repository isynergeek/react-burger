import styles from './IngredientCard.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { memo, MouseEventHandler } from 'react';
import { useDrag } from 'react-dnd';
import { DragAndDropType } from '../../../constants/dragAndDropType';
import { useAppSelector } from '../../../services/hooks';

type TIngredientCardProps = {
  id: string,
  count?: number,
  image: string
  price: number
  name: string,
  itemClick: MouseEventHandler
}

const IngredientCard = memo(({ id, image, price, name, itemClick }: TIngredientCardProps) => {

  const { bun, items } = useAppSelector(state => state.burgerConstructor);
  const allIngredients = [bun, bun, ...items].filter(Boolean);
  const count = allIngredients.filter(item => item?._id === id).length;

  const [, dragRef] = useDrag({
    type: DragAndDropType.INGREDIENT,
    item: { id },
  });

  return (
    <div className={styles.main} onClick={itemClick} ref={dragRef}>
      <div className={styles.img}>
        <img src={image} alt={name}/>
        <div className={styles.counter}>
          {count > 0 && <Counter count={count}/>}
        </div>
      </div>
      <div className={styles.price}>
        <span className="text text_type_digits-default pr-2">{price}</span>
        <CurrencyIcon type="primary"/>
      </div>
      <div className={`${styles.title} text text_type_main-default pb-6`}>{name}</div>
    </div>
  );
});

IngredientCard.displayName = 'IngredientCard';

export default IngredientCard;
