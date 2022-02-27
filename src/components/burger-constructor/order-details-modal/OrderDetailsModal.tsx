import Modal from "../../modal/Modal";
import OrderDetails from '../../order-details/OrderDetails';
import OrderFailed from "../../order-details/order-failed/OrderFailed";
import { useAppSelector } from '../../../services/hooks';

type TOrderDetailsModalProps = {
    onClose: () => void
};

const OrderDetailsModal = ({onClose}: TOrderDetailsModalProps) => {
    const { orderNumRequest, orderNumError, orderNum } = useAppSelector(state=>state.orderDetails);

    const content = (() => {
        if (orderNumRequest) {
            return (<div> Загрузка...</div>);
        }
        return orderNumError ? <OrderFailed /> : <OrderDetails orderNum={orderNum} />
    })();

    return (
        <Modal close={onClose}>
            {content}
        </Modal>)
}

export default OrderDetailsModal;
