import styles from './BurgerConstructor.module.css';
import { useState } from 'react';
import Controls from './controls/Controls';
import BunItem from './bun-item/BunItem';
import FillingItems from './filling-items/FillingItems';
import OrderDetailsModal from './order-details-modal/OrderDetailsModal';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { makeOrder } from '../../services/actions/orderDetails';
import { IIngredient } from '../../services/reducers/burgerIngredientsSlice';
import { useDrop } from 'react-dnd';
import { DragAndDropTypes } from '../../constants/dragAndDropTypes';
import { IngredientTypes } from '../../constants/ingredientTypes';
import {
  ADD_BUN,
  ADD_INGREDIENT,
  CLEAR_CONSTRUCTOR
} from '../../services/reducers/burgerConstructorSlice';
import { useHistory } from 'react-router-dom';
import ROUTES from '../../constants/routes';

const getOrderIdsFromState = ({ items, bun}: { items: IIngredient[], bun: IIngredient | null }) => {
  const itemIds = items.map(item => item._id);
  const bunId = bun?._id;
  const orderIds = [bunId, bunId, ...itemIds].filter(Boolean);
  return orderIds as string[];
};

const BurgerConstructor = () => {
    const dispatch = useAppDispatch();
    const history = useHistory();

    const [orderModalVisible, setOrderModalVisible] = useState(false);
    const { items, bun } = useAppSelector(state => state.burgerConstructor);
    const { items: ingredients } = useAppSelector(state => state.burgerIngredients);
    const isAuth = useAppSelector(state => state.userProfile.isAuth);

    const onMakeOrderBtnClick = () => {
      if (!isAuth) {
        history.push(ROUTES.LOGIN);
        return;
      }
      if (items.length === 0 || !bun) {
        return;
      }
      const itemIds = getOrderIdsFromState({items,bun});

      dispatch(makeOrder(itemIds))
        .then(() => dispatch(CLEAR_CONSTRUCTOR()));
      setOrderModalVisible(true);
    };

    const onDropHandler = (id: string) => {
      const dropIngredient = ingredients.find(ingredient => ingredient._id === id);
      if (!dropIngredient) {
        return;
      }

      if (dropIngredient.type === IngredientTypes.BUN) {
        dispatch(ADD_BUN(dropIngredient));
        return;
      }

      dispatch(ADD_INGREDIENT(dropIngredient));
    };

    const [{ isHover }, dropTarget] = useDrop({
      accept: DragAndDropTypes.INGREDIENT,
      drop(item: { id: string }) {
        onDropHandler(item.id);
      },
      collect: monitor => ({
        isHover: monitor.isOver()
      })
    });

    const borderColor = isHover ? 'lightgreen' : 'transparent';

    return (
      <section className={`${styles.Root} mt-25`}>
        <section ref={dropTarget} style={{ borderColor }} className={styles.Content}>
          <BunItem item={bun}/>
          <FillingItems items={items}/>
          <BunItem item={bun} type="bottom"/>
        </section>
        <Controls makeOrderBtnClick={onMakeOrderBtnClick}/>

        {orderModalVisible &&
          <OrderDetailsModal onClose={() => setOrderModalVisible(false)}/>}
      </section>
    );
  }
;

export default BurgerConstructor;
