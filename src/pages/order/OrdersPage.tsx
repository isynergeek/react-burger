import styles from './OrdersPage.module.css';
import OrderCard from '../../components/order-card/OrderCard';
import { OrderStatusEnum } from '../../constants/orderStatusEnum';
import { useEffect } from 'react';
import { wsConnect, wsDisconnect } from '../../services/actions/wsActions';
import { ORDER_FEED_WS_URL } from '../../constants/wsUrls';
import ROUTES from '../../constants/routes';
import { useHistory, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { storageService } from '../../services/storageService';
import { LOCAL_STORAGE_KEYS } from '../../constants/localStorageKeys';

const OrdersPage = () => {

  const history = useHistory();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const orders = useAppSelector(state => state.orderFeed.data.orders);
  const accessToken = storageService.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);

  useEffect(() => {
    dispatch(wsConnect(`${ORDER_FEED_WS_URL}?token=${accessToken}`));
    return () => {
      dispatch(wsDisconnect());
    }
  },[]);

  const clickHandler = (id: string) => {
    history.push(`${ROUTES.ORDERS}/${id}`, {background: location});
  }
  return (
    <section className={`p-2 ${styles.Root} custom-scroll`}>
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

export default OrdersPage;
