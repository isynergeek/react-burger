import styles from './IngredientCard.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import {MouseEventHandler} from "react";


interface IngredientCardPropsType {
    count?: number,
    image: string
    price: number
    name: string,
    itemClick: MouseEventHandler
}

const IngredientCard = (props: IngredientCardPropsType) => {
    const {count, image, price, name, itemClick} = props;
    return (
        <div className={styles.main} onClick={itemClick}>
            <div className={styles.img}>
                <img src={image} alt={name}/>
                <div className={styles.counter}>
                    {count && <Counter count={count}/>}
                </div>
            </div>
            <div className={styles.price}>
                <span className="text text_type_digits-default pr-2">{price}</span>
                <CurrencyIcon type="primary"/>
            </div>
            <div className={`${styles.title} text text_type_main-default pb-6`}>{name}</div>
        </div>
    );
}

IngredientCard.propTypes = {
    count: PropTypes.number,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
};


export default IngredientCard;
