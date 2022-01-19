import styles from "./OrderFailed.module.css";

const OrderFailed = () => {
    return (
        <section className={styles.Root}>
            <div className="text text_type_main-default pb-2">Ошибка формирования заказа</div>
        </section>
    );
}

export default OrderFailed;
