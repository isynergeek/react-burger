import styles from './OrderCard.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../services/hooks';
import IngredientIconRow from '../ingredient-icon-row/IngredientIconRow';
import OrderStatus from '../order-status/OrderStatus';
import { OrderStatusEnum } from '../../constants/orderStatusEnum';

interface IOrderCardProps {
  id: string,
  number: string | number,
  time: string,
  name: string,
  ingredientIds: string[],
  status?: OrderStatusEnum,
  onClick: (number: string) => void,
}

const OrderCard = (props: IOrderCardProps) => {
  const { id, name, number, time, ingredientIds, status = undefined, onClick } = props;
  const ingredientState = useAppSelector(state => state.burgerIngredients.items);

  const icons: string[] = [];
  let price = 0;

  ingredientIds.forEach(id => {
      const record = ingredientState.find(item => item._id === id);
      if (!record) {
        return '';
      }
      icons.push(record.image_mobile);
      price += record.price;
  })


  return (
    <section className={styles.Root} onClick={() => onClick(id)}>
      <div className={styles.Card}>
        <div className={styles.Row}>
          <div className={styles.RowItem}>
            <span className={'text text_type_digits-default'}>#{number}</span>
          </div>
          <div className={styles.RowItem}>
            <div className={`text text_type_main-default ${styles.TimeText}`}>{time}</div>
          </div>
        </div>
        <div className={'mb-6'}/>
        <div className={'text text_type_main-medium '}>
          {name}
        </div>
        {status ? (<OrderStatus status={status}/>) : null}
        <div className={'mb-6'}/>
        <div className={styles.Row}>
          <IngredientIconRow icons={icons}/>
          <div className={styles.Price}>
            <span className="text text_type_digits-default pr-2">{price}</span>
            <CurrencyIcon type="primary"/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderCard;
