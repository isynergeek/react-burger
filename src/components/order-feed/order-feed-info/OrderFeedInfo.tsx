import styles from './OrderFeedInfo.module.css';
import OrderGrid from './order-grid/OrderGrid';
import OrderCount from './order-count/OrderCount';
import { useAppSelector } from '../../../services/hooks';
import { OrderStatusEnum } from '../../../constants/orderStatusEnum';

const ORDER_COUNT_TOTAL_TITLE = 'Выполнено за все время:';
const ORDER_COUNT_TODAY_TITLE = 'Выполнено за сегодня:';

const OrderFeedInfo = () => {

  const orderData = useAppSelector(state => state.orderFeed.data);
  const {total, totalToday, orders} = orderData;

  const doneOrderIds = orders
    .filter(item => item.status === OrderStatusEnum.DONE)
    .map(item => item.number);

  const pendingOrderIds = orders
    .filter(item => item.status === OrderStatusEnum.PENDING)
    .map(item => item.number);

  return (
    <section className={styles.Root}>
      <div className={styles.Row}>
        <div className={`${styles.Col} custom-scroll`}>
          <OrderGrid title={'Готовы:'} ids={doneOrderIds} textColor={'#00CCCC'}/>
        </div>
        <div className={styles.Col}>
          <OrderGrid title={'В работе:'} ids={pendingOrderIds}/>
        </div>
      </div>
      <div className={'mb-15'}/>
      <OrderCount text={ORDER_COUNT_TOTAL_TITLE} number={total}/>
      <div className={'mb-15'}/>
      <OrderCount text={ORDER_COUNT_TODAY_TITLE} number={totalToday}/>
    </section>
  );
};

export default OrderFeedInfo;
