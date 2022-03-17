import styles from './OrderFeed.module.css';
import OrderFeedList from './order-feed-list/OrderFeedList';
import OrderFeedInfo from './order-feed-info/OrderFeedInfo';

const OrderFeed = () => {
  return (
    <section className={styles.Root}>
      <div className={styles.Container}>
        <div className={'mt-10 mb-5 text text_type_main-large'}>
          Лента заказов
        </div>
        <div className={styles.Content}>
          <div className={`${styles.ContentContainer} custom-scroll`}>
            <OrderFeedList/>
          </div>
          <div className={`${styles.ContentContainer} custom-scroll`}>
            <OrderFeedInfo/>
          </div>
        </div>
      </div>

    </section>
  );
};

export default OrderFeed;
