import styles from './OrderGrid.module.css';

interface IOrderGrid {
  title: string,
  textColor?: string,
  ids: string[] | number[],
}

const OrderGrid = (props: IOrderGrid) => {
  const {title, textColor = '#F2F2F3', ids} = props;

  return (
    <section className={styles.Root}>
      <div className={'text text_type_main-medium'}>{title}</div>
      <div className={'mb-6'}/>
      <div className={styles.List}>
        {ids.map(id => <div key={id} className={`${styles.ListItem} text text_type_digits-default`} style={{color: textColor}}>{id}</div>)}
      </div>
    </section>
  );
};

export default OrderGrid;
