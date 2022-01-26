import Modal from "../../modal/Modal";
import OrderDetails, { TOrderNum } from '../../order-details/OrderDetails';
import OrderFailed from "../../order-details/order-failed/OrderFailed";

type TOrderDetailsModalProps = {
    orderNum: TOrderNum,
    onClose: () => void
};

const OrderDetailsModal = ({onClose, orderNum}: TOrderDetailsModalProps) => {
    return (
        <Modal close={onClose}>
            {orderNum ? <OrderDetails orderNum={orderNum} /> : <OrderFailed />}
        </Modal>)
}

export default OrderDetailsModal;
