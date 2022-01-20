import styles from './BurgerConstructor.module.css';
import React, {useContext, useEffect, useState} from "react";
import Controls from "./controls/Controls";
import BunItem from "./bun-item/BunItem";
import FillingItems from "./filling-items/FillingItems";
import OrderDetailsModal from "./order-details-modal/OrderDetailsModal";
import {BurgerConstructorContext, TBurgerConstructorState, TOrderNum} from 'services/burgerConstructorContext';
import {makeOrder} from "api/Api";


const getOrderIdsFromState = (state: TBurgerConstructorState) => {
    const fillingIds = state.filling.map(item => item._id);
    const bunId = state.bun?._id;
    const orderIds = [bunId, bunId, ...fillingIds].filter(Boolean);
    return orderIds;
}

const BurgerConstructor = () => {
    const {state, dispatch} = useContext(BurgerConstructorContext);
    
    const [orderModalVisible, setOrderModalVisible] = useState(false);
    const onMakeOrderBtnClick = () => {
        const orderIds = getOrderIdsFromState(state);
        if (orderIds.length) {
            makeOrder(orderIds).then(response => {
                const orderNum: TOrderNum = response?.order.number;
                if (orderNum) {
                    dispatch({type: "setOrderNum", payload: orderNum});
                    setOrderModalVisible(true);
                }
            }).catch(e => {
                console.error(e);
                dispatch({type: "setOrderNum", payload: null});
                setOrderModalVisible(true);
            })
        }
    }
    return (
        <section className={`${styles.Root} mt-25`}>
            <BunItem item={state.bun} />
            <FillingItems items={state.filling} />
            <BunItem item={state.bun} type="bottom" />
            <Controls makeOrderBtnClick={onMakeOrderBtnClick} />
            {orderModalVisible &&
            <OrderDetailsModal orderNum={state.orderNum} onClose={() => setOrderModalVisible(false)} />}
        </section>
    );
}

export default BurgerConstructor;
