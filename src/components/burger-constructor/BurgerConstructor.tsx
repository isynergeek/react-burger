import styles from './BurgerConstructor.module.css';
import ConstructorItem from "./ConstructorItem";
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import data from "../../utils/data";

const TopItem = () => {
    const itemData = data[0];
    return (
        <div className="mb-4">
            <ConstructorItem draggable={false}>
                <ConstructorElement type="top" text={itemData.name} thumbnail={itemData.image_mobile} isLocked={true}
                                    price={itemData.price}/>
            </ConstructorItem>
        </div>
    );
};

const BottomItem = () => {
    const itemData = data[data.length - 1];
    return (
        <div className="mt-4 mb-10">
            <ConstructorItem draggable={false}>
                <ConstructorElement type="bottom" text={itemData.name} thumbnail={itemData.image_mobile}
                                    price={itemData.price} isLocked={true}/>
            </ConstructorItem>
        </div>
    );
}

const FillingItems = () => {
    const items = data.slice(1, data.length - 1);
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

const Controls = () => {
    return (
        <div className={`${styles.controls} mb-10`}>
            <div className={styles.orderPrice}>
                <span className="text text_type_digits-medium pr-2">610</span>
                <CurrencyIcon type="primary"/>
            </div>
            <div className={styles.orderButton}>
                <Button>
                    Оформить заказ
                </Button>
            </div>
        </div>
    );
}


const BurgerConstructor = () => {
    return (
        <section className="mt-25">
            <TopItem/>
            <FillingItems/>
            <BottomItem/>
            <Controls/>
        </section>
    );
}

export default BurgerConstructor;
