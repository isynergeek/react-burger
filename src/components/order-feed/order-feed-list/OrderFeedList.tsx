import styles from './OrderFeedList.module.css';
import OrderCard from '../../order-card/OrderCard';
import { OrderStatusEnum } from '../../../constants/orderStatusEnum';
import { useHistory, useLocation } from 'react-router-dom';
import ROUTES from '../../../constants/routes';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../services/hooks';
import { wsConnect, wsDisconnect } from '../../../services/actions/wsActions';
import { ORDER_FEED_WS_URL } from '../../../constants/wsUrls';

const OrderFeedList = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const orders = useAppSelector(state => state.orderFeed.data.orders);

  useEffect(() => {
    dispatch(wsConnect(ORDER_FEED_WS_URL));
    return () => {
      dispatch(wsDisconnect());
    }
  },[]);

  const clickHandler = (id: string) => {
    history.push(`${ROUTES.ORDER_FEED}/${id}`, {background: location});
  }

  return (
    <section className={`m-2 ${styles.Root}`}>
      {orders.map(item =>
        <OrderCard key={item.number}
                   id={item._id}
                   name={item.name}
                   number={item.number}
                   time={item.createdAt}
                   ingredientIds={item.ingredients}
                   status={item.status as OrderStatusEnum}
                   onClick={clickHandler}
        />
      )}
    </section>
  );
};

export default OrderFeedList;
