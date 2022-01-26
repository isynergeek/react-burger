import styles from './BunItem.module.css';
import { ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredient } from '../../../services/reducers/burgerIngredientsSlice';

type TBunItem = {
    item: IIngredient | null,
    type?: 'top' | 'bottom'
}

const BunItem = ({item, type = 'top'}: TBunItem) => {
    const typeText = type === 'top' ? 'верх' : 'низ';
    const className = type === 'top' ? 'mb-4' : 'mt-4';

  return (
    <div className={className}>
      {item ? (<section className={styles.main}>
          <div className={styles.dragIcon}/>
          <div className={styles.item}>
            <ConstructorElement type={type} text={`${item.name} (${typeText})`}
                                thumbnail={item.image_mobile}
                                isLocked={true}
                                price={item.price}/>
          </div>
        </section>) :
        <div className={`${styles.PlaceHolder} text text_type_main-default`}>Выберите булку</div>}
    </div>
  );
}
export default BunItem;
