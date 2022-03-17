import styles from './OrderCount.module.css';

interface IOrderCountProps {
  text: string,
  number: number
}

const OrderCount = (props: IOrderCountProps) => {
  const {text, number} = props;
  return (
    <section className={styles.Root}>
      <div className={'text text_type_main-medium'}>{text}</div>
      <div className={`text text_type_digits-large ${styles.Number}`}>{number}</div>
    </section>
  );
};

export default OrderCount;
