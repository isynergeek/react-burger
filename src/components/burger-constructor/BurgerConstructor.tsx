import styles from './BurgerConstructor.module.css';
import ConstructorItem from "components/burger-constructor/constructor-item/ConstructorItem";
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import Modal from "../modal/Modal";
import OrderDetails from "../order-details/OrderDetails";
import {TIngredient} from "../app/App";

const TopItem = ({item}: { item: TIngredient }) => {
    return (
        <div className="mb-4">
            <ConstructorItem draggable={false}>
                <ConstructorElement type="top" text={`${item.name} (верх)`} thumbnail={item.image_mobile} isLocked={true}
                                    price={item.price}/>
            </ConstructorItem>
        </div>
    );
};

const BottomItem = ({item}: { item: TIngredient }) => {
    return (
        <div className="mt-4 mb-10">
            <ConstructorItem draggable={false}>
                <ConstructorElement type="bottom" text={`${item.name} (низ)`} thumbnail={item.image_mobile}
                                    price={item.price} isLocked={true}/>
            </ConstructorItem>
        </div>
    );
}

type TFillingItemsProps = {
    items: TIngredient[]
}
const FillingItems = ({items}: TFillingItemsProps) => {
    return (
        <section className={`${styles.fillingItems} custom-scroll`}>
            {
                items.map(item => (
                    <ConstructorItem key={item._id}>
                        <ConstructorElement text={item.name} thumbnail={item.image_mobile}
                                            price={item.price}/>
                    </ConstructorItem>
                ))
            }
        </section>
    );
}

type TBurgerConstructorControlsProps = {
    makeOrderBtnClick: () => void
}

const Controls = (props: TBurgerConstructorControlsProps) => {
    const {makeOrderBtnClick} = props;
    return (
        <div className={`${styles.controls} mb-10`}>
            <div className={styles.orderPrice}>
                <span className="text text_type_digits-medium pr-2">610</span>
                <CurrencyIcon type="primary"/>
            </div>
            <div className={styles.orderButton}>
                <Button onClick={makeOrderBtnClick}>
                    Оформить заказ
                </Button>
            </div>
        </div>
    );
}

type TOrderDetailsModalProps = {
    onClose: Function
};

const OrderDetailsModal = ({onClose}: TOrderDetailsModalProps) => {
    return (
        <Modal close={onClose}>
            <OrderDetails orderId="034536"/>
        </Modal>)
}


type TBurgerConstructorProps = {
    ingredients: TIngredient[]
}

const BurgerConstructor = ( {ingredients}: TBurgerConstructorProps) => {
    const [orderModalVisible, setOrderModalVisible] = useState(false);

    const bunItem = ingredients[0];

    const onMakeOrderBtnClick = () => {
        setOrderModalVisible(true);
    }

    return (
        <section className="mt-25">
            <TopItem item={bunItem}/>
            <FillingItems items={ingredients}/>
            <BottomItem item={bunItem}/>
            <Controls makeOrderBtnClick={onMakeOrderBtnClick}/>
            {orderModalVisible && <OrderDetailsModal onClose={() => setOrderModalVisible(false)}/>}
        </section>
    );
}

export default BurgerConstructor;
