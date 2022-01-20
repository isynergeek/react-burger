import {memo, useContext} from "react";
import styles from "./FillingItems.module.css";
import ConstructorItem from "../constructor-item/ConstructorItem";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {BurgerConstructorContext, TFillingIngredient} from "../../../services/burgerConstructorContext";

type TFillingItemsProps = {
    items: TFillingIngredient[]
}

const FillingItems = memo(({items}: TFillingItemsProps) => {
    const {dispatch} = useContext(BurgerConstructorContext);
    const onItemDelete = (fillingItemId: string) => {
        dispatch({type: 'removeItem', payload: fillingItemId})
    }
    return (
        <section className={`${styles.Root} custom-scroll`}>
            {
                items.map(item => (
                    <ConstructorItem key={item.fillingId}>
                        <ConstructorElement text={item.name} thumbnail={item.image_mobile}
                                            price={item.price} handleClose={() => onItemDelete(item.fillingId)} />
                    </ConstructorItem>
                ))
            }
        </section>
    );
});

export default FillingItems;
