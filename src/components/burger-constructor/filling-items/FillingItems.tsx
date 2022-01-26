import { memo, useCallback } from 'react';
import styles from "./FillingItems.module.css";
import ConstructorItem from "../constructor-item/ConstructorItem";
import { IIngredient } from '../../../services/reducers/burgerIngredientsSlice';
import { useAppDispatch } from '../../../services/hooks';
import {
  REMOVE_INGREDIENT,
  SET_INGREDIENTS
} from '../../../services/reducers/burgerConstructorSlice';
import update from 'immutability-helper'

type TFillingItemsProps = {
    items: IIngredient[]
}

const FillingItems = memo(({items}: TFillingItemsProps) => {
    const dispatch = useAppDispatch();
    const onItemDelete = (id: string) => {
        dispatch(REMOVE_INGREDIENT(id))
    }

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = items[dragIndex];
      const dragged = update(items, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      });
      dispatch(SET_INGREDIENTS(dragged));
    },
    [items],
  );

    return (
        <section className={`${styles.Root} custom-scroll`}>
            {
                items.map((item, index) => (
                  <ConstructorItem key={item.appId}
                                   id={item.appId}
                                   item={item}
                                   moveCard={moveCard}
                                   index={index}
                                   handleClose={() => onItemDelete(item.appId)}/>
                ))
            }
        </section>
    );
});

FillingItems.displayName = 'FillingItems';

export default FillingItems;
