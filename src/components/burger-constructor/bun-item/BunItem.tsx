import styles from './BunItem.module.css';
import {TIngredient} from "../../app/App";
import ConstructorItem from "../constructor-item/ConstructorItem";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";

type TBunItem = {
    item: TIngredient | null,
    type?: 'top' | 'bottom'
}

const BunItem = ({item, type = 'top'}: TBunItem) => {
    const typeText = type === 'top' ? 'верх' : 'низ';
    const className = type === 'top' ? 'mb-4' : 'mt-4';

    return (
        <div className={className}>
            {item ? (<ConstructorItem draggable={false}>
                <ConstructorElement type={type} text={`${item.name} (${typeText})`} thumbnail={item.image_mobile}
                                    isLocked={true}
                                    price={item.price}/>
            </ConstructorItem>) : <div className={`${styles.PlaceHolder} text text_type_main-default`}>Выберите булку</div>}
        </div>
    );
}
export default BunItem;
