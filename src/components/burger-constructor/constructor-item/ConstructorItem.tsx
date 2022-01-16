import React from 'react';
import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ConstructorItem.module.css';

type TConstructorItemPropsType = {
    draggable?: boolean;
    children: JSX.Element;
}

function ConstructorItem({draggable = true, children}: TConstructorItemPropsType) {
    return (
        <section className={styles.main}>
            <div className={styles.dragIcon}>
                {draggable && <DragIcon type="primary"/>}
            </div>
            <div className={styles.item}>
                {children}
            </div>
        </section>
    );
}

export default ConstructorItem;
