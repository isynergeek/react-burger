import styles from './OrderIngredientList.module.css';
import OrderIngredient from '../order-ingredient/OrderIngredient';
import { useAppSelector } from '../../services/hooks';

interface IOrderIngredientList {
  ids: string[]
}

const OrderIngredientList = (props: IOrderIngredientList) => {

  const ingredients = useAppSelector(state => state.burgerIngredients.items);
  const {ids} = props;
  const items = ids
    .filter((x, i, a) => a.indexOf(x) === i)
    .map(id => {
      const record = ingredients.find(item => item._id === id);
      if (record) {
        return {
          id: record._id,
          icon: record.image,
          name: record.name,
          price: record.price,
          count: ids.filter(item => item === id).length
        };
      }
    })
    .filter(Boolean);

  return (
    <section className={`${styles.Root} custom-scroll`}>
      <div className={`${styles.Container} mr-6`}>
        {items.map(item => {
          return item && <OrderIngredient key={item.id} {...item}/>;
        })}
      </div>
    </section>
  );
};

export default OrderIngredientList;
