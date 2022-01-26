import styles from './OrderDetails.module.css';
import orderDoneImg from 'images/done.png';

export type TOrderNum = string | number | null;
type TOrderDetailsProps = {
    orderNum: TOrderNum
}

const OrderDetails = ({orderNum}: TOrderDetailsProps) => {
    return (
        <section className={styles.Root}>
            <div className={`${styles.OrderId} pt-20 pb-8 text text_type_digits-large`}>{orderNum}</div>
            <div className="text text_type_main-medium pb-15">идентификатор заказа</div>
            <div className="pb-15"><img src={orderDoneImg} alt="Ваш заказ начали готовить" /></div>
            <div className="text text_type_main-default pb-2">Ваш заказ начали готовить</div>
            <div className={`${styles.TextGray} text text_type_main-default pb-15`}>Дождитесь готовности на орбитальной
                станции
            </div>
        </section>
    );
};

export default OrderDetails;
