import React from 'react';
import PropTypes from "prop-types";
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ConstructorItem.module.css';

function ConstructorItem(props: { draggable?: boolean; children: any; }) {
    const {draggable = true, children} = props;
    return (
        <section className={styles.main}>
            <div className={styles.dragIcon}>
                {draggable && <DragIcon type="primary" />}
            </div>
            <div className={styles.item}>
                {children}
            </div>
        </section>
    );
}

ConstructorItem.propTypes = {
    draggable: PropTypes.bool
}

export default ConstructorItem;
