import styles from './OrderInfoPage.module.css';
import OrderInfo from '../../components/order-info/OrderInfo';

const OrderInfoPage = () => {
  return (
    <section className={styles.Root}>
      <OrderInfo/>
    </section>
  );
};

export default OrderInfoPage;
