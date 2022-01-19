import Modal from "../../modal/Modal";
import OrderDetails from "../../order-details/OrderDetails";
import {TOrderNum} from "../../../services/burgerConstructorContext";
import OrderFailed from "../../order-details/order-failed/OrderFailed";

type TOrderDetailsModalProps = {
    orderNum: TOrderNum,
    onClose: Function
};

const OrderDetailsModal = ({onClose, orderNum}: TOrderDetailsModalProps) => {
    return (
        <Modal close={onClose}>
            {orderNum ? <OrderDetails orderNum={orderNum} /> : <OrderFailed />}
        </Modal>)
}

export default OrderDetailsModal;