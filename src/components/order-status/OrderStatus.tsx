import { OrderStatusEnum as OrderStatusEnum, orderStatusPayload } from '../../constants/orderStatusEnum';

interface IOrderStatus {
  status: OrderStatusEnum;
}

const OrderStatus = (props: IOrderStatus) => {
  const { status } = props;

  return (
    <div className={'mt-2'}>
      <div className={'text text_type_main-default'}
           style={{ color: orderStatusPayload[status]?.color }}>
        {orderStatusPayload[status]?.text}
      </div>
    </div>
  );
};

export default OrderStatus;
