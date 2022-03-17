import styles from './OrderIngredient.module.css';
import IngredientIcon from '../ingredient-icon/IngredientIcon';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface IOrderIngredientProps {
  id: string,
  icon: string,
  name: string,
  count: number,
  price: number,
}

const OrderIngredient = (props: IOrderIngredientProps) => {
  const {icon, count, price, name} = props;
  return (
    <section className={`${styles.Root} mb-4`}>
      <div className={styles.Container}>
        <IngredientIcon icon={icon}/>
        <div className={`text text_type_main-default ${styles.Text}`}>{name}</div>
        <div className={styles.Price}>
          <span className="text text_type_digits-default pr-2">{count} x {price}</span>
          <CurrencyIcon type="primary"/>
        </div>
      </div>


    </section>
  );
};

export default OrderIngredient;
