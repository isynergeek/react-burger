import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ConstructorItem.module.css';
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from 'react-dnd';
import { DragAndDropTypes } from '../../../constants/dragAndDropTypes';
import { useRef } from 'react';
import { IIngredient } from '../../../services/reducers/burgerIngredientsSlice';

type TConstructorItemProps = {
  id: string
  index: number
  item: IIngredient
  moveCard : (dragIndex: number, hoverIndex: number) => void
  handleClose: () => void
}

interface IDragItem {
  index: number;
  id: string;
  type: string;
}

function ConstructorItem({ item, moveCard, index,  id,  handleClose }: TConstructorItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: DragAndDropTypes.INGREDIENT_ORDER,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: IDragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: DragAndDropTypes.INGREDIENT_ORDER,
    item: () => {
      return {
        id,
        index
      };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <section className={styles.main}  style={{opacity}} ref={ref} data-handler-id={handlerId}>
      <div className={styles.dragIcon}>
       <DragIcon type="primary"/>
      </div>
      <div className={styles.item}>
        <ConstructorElement text={item.name} thumbnail={item.image_mobile}
                            price={item.price} handleClose={handleClose} />
      </div>
    </section>
  );
}

export default ConstructorItem;
