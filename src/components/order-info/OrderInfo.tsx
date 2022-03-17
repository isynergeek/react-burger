import styles from './OrderInfo.module.css';
import OrderStatus from '../order-status/OrderStatus';
import OrderIngredientList from '../order-ingredient-list/OrderIngredientList';
import { useEffect } from 'react';
import { wsConnect, wsDisconnect } from '../../services/actions/wsActions';
import { ORDER_FEED_WS_URL } from '../../constants/wsUrls';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { useLocation, useParams } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ROUTES from '../../constants/routes';
import { storageService } from '../../services/storageService';
import { LOCAL_STORAGE_KEYS } from '../../constants/localStorageKeys';

const OrderInfo = () => {
  const dispatch = useAppDispatch();
  const { id: orderId } = useParams<{ id: string }>();
  const location = useLocation<{ background: { pathname: string } }>();

  useEffect(() => {
    const withToken = location.state?.background?.pathname === ROUTES.ORDERS;
    let url = `${ORDER_FEED_WS_URL}`;
    if (withToken) {
      const accessToken = storageService.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
      url = `${ORDER_FEED_WS_URL}?token=${accessToken}`;
    }

    dispatch(wsConnect(url));

    return () => {
      dispatch(wsDisconnect());
    };
  }, []);

  const ingredientState = useAppSelector(state => state.burgerIngredients.items);
  const feedData = useAppSelector(state => state.orderFeed.data);

  const orders = feedData.orders;

  if (orders.length === 0) {
    return (
      <div>Загрузка...</div>
    );
  }

  const orderData = orders.find(item => item._id === orderId);

  if (!orderData) {
    return (
      <div>Заказ не найден</div>
    );
  }

  let price = 0;
  orderData.ingredients.forEach(id => {
    const record = ingredientState.find(item => item._id === id);
    if (record) {
      price += record.price;
    }
  });

  const { number, name, status, createdAt, ingredients } = orderData;

  return (
    <section className={styles.Root}>
      <div className={styles.Container}>
        <div className={`text text_type_digits-default ${styles.TextCenter}`}>#{number}</div>
        <div className={'mb-10'}/>
        <div className={'text text_type_main-medium '}>
          {name}
        </div>
        <div className={'mb-3'}/>
        <OrderStatus status={status}/>
        <div className={'mb-15'}/>
        <div className={'text text_type_main-medium '}>
          Состав:
        </div>
        <div className={'mb-6'}/>
        <OrderIngredientList ids={ingredients}/>
        <div className={'mb-10'}/>
        <div className={styles.Row}>
          <div className={styles.RowItem}>
            <div className={`text text_type_main-default ${styles.TextInactive}`}>
              {createdAt}</div>
          </div>
          <div className={styles.RowItem}>
            <div className={`text text_type_digits-default ${styles.TextRight}`}>
              <span className="text text_type_digits-default pr-2">{price}</span>
              <CurrencyIcon type="primary"/>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderInfo;
