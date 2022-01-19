import {TIngredient} from "../components/app/App";
import React from "react";
import {v4} from "uuid";

export type TOrderNum =  string | number | null;

export type TFillingIngredient = TIngredient & {
    fillingId: string
}

export type TBurgerConstructorState = {
    bun: TIngredient | null,
    filling: TFillingIngredient[],
    orderPrice: number,
    orderNum: TOrderNum,
}

export const initialState = {
    bun: null,
    filling: [],
    orderPrice: 0,
    orderNum: null
} as TBurgerConstructorState;

export const BurgerConstructorContext = React.createContext({} as { state: TBurgerConstructorState, dispatch: React.Dispatch<TBurgerConstructorAction> });

export type TBurgerConstructorAction = { type: 'addItem' | 'addBun', payload: TIngredient }
    | { type: 'removeItem', payload: string }
    | { type: 'setOrderNum', payload: TOrderNum }

export const reducer = (state: TBurgerConstructorState, action: TBurgerConstructorAction): TBurgerConstructorState => {

    const calculatePrice = (filling: TIngredient[], bunPrice: number = 0): number => {
        const fillingPrice = filling.reduce<number>((acc: number, current: TIngredient) => acc + current.price, 0);
        return fillingPrice + bunPrice * 2;
    }

    if (action.type === 'addItem') {
        const item: TFillingIngredient = {fillingId: v4(), ...action.payload};
        const filling = [...state.filling, item];
        const orderPrice = calculatePrice(filling, state.bun?.price);
        return {...state, filling, orderPrice};
    }

    if (action.type === 'removeItem') {
        const filling = state.filling.filter(item => item.fillingId !== action.payload)
        const orderPrice = calculatePrice(filling, state.bun?.price);
        return {...state, filling, orderPrice};
    }

    if (action.type === 'addBun') {
        const orderPrice = calculatePrice(state.filling, action.payload.price);
        return {...state, bun: action.payload, orderPrice}
    }

    if (action.type === 'setOrderNum') {
        return {...state, orderNum: action.payload}
    }

    return state;
}
