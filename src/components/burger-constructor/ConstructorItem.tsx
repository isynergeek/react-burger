import React from 'react';
import PropTypes from "prop-types";
import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ConstructorItem.module.css';

interface ConstructorItemPropsType {
    draggable?: boolean;
    children: JSX.Element;
}

function ConstructorItem(props: ConstructorItemPropsType) {
    const {draggable = true, children} = props;
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

ConstructorItem.propTypes = {
    draggable: PropTypes.bool,
    children: PropTypes.element.isRequired
}

export default ConstructorItem;
