import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './Controls.module.css';
import {useContext} from "react";
import {BurgerConstructorContext} from "../../../services/burgerConstructorContext";

type TBurgerConstructorControlsProps = {
    makeOrderBtnClick: () => void
}

const Controls = ({makeOrderBtnClick}: TBurgerConstructorControlsProps) => {
    const {state} = useContext(BurgerConstructorContext);

    return (
        <div className={`${styles.Root} mt-10 mb-10`}>
            <div className={styles.OrderPrice}>
                <span className="text text_type_digits-medium pr-2">{state.orderPrice}</span>
                <CurrencyIcon type="primary" />
            </div>
            <div className={styles.OrderButton}>
                <Button onClick={makeOrderBtnClick}>
                    Оформить заказ
                </Button>
            </div>
        </div>
    );
}
export default Controls;
