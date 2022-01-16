import React from 'react';
import styles from './IngredientDetails.module.css';

type IngredientDetailBlockPropsType = {
    name: string,
    value: number
}

const DetailBlock = ({name, value}: IngredientDetailBlockPropsType) => {
    return (
        <section className={styles.DetailBlock}>
            <div className="text text_type_main-default">{name}</div>
            <div  className="text text_type_digits-default">{value}</div>
        </section>
    );
}

export type IngredientDetailsPropsType = {
    calories: number,
    carbohydrates: number,
    fat: number,
    proteins: number,
    name: string,
    image: string,
}

const IngredientDetails = (props: IngredientDetailsPropsType) => {
    const {calories, carbohydrates, fat, proteins, name, image} = props;
    return (
        <section className={styles.Root}>
            <div className="text text_type_main-large">Детали ингредиента</div>
            <div className={styles.Content}>
                <img className="mb-4" src={image} alt={name}/>
                <div className="mb-8 text text_type_main-medium">{name}</div>
                <div className={`${styles.DetailBlockRow} mb-5`}>
                    <DetailBlock name="Калории,ккал" value={calories}/>
                    <DetailBlock name="Белки, г" value={proteins}/>
                    <DetailBlock name="Жиры, г" value={fat}/>
                    <DetailBlock name="Углеводы, г" value={carbohydrates}/>
                </div>
            </div>
        </section>
    );
};

export default IngredientDetails;
