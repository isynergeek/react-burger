import React from 'react';
import styles from './OrderDetails.module.css';
import orderDoneImg from 'images/done.png';

type TOrderDetailsPropsType = {
    orderId: number | string
}

const OrderDetails = ({orderId}: TOrderDetailsPropsType) => {
    return (
        <section className={styles.Root}>
            <div className={`${styles.OrderId} pt-20 pb-8 text text_type_digits-large`}>{orderId}</div>
            <div className="text text_type_main-medium pb-15">идентификатор заказа</div>
            <div className="pb-15"><img src={orderDoneImg} alt="Ваш заказ начали готовить"/></div>
            <div className="text text_type_main-default pb-2">Ваш заказ начали готовить</div>
            <div className={`${styles.TextGray} text text_type_main-default pb-15`}>Дождитесь готовности на орбитальной станции</div>
        </section>
    );
};

export default OrderDetails;
