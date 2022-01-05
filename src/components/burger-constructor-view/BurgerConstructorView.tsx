import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import styles from './BurgerConstructorView.module.css';

const BurgerConstructorView = () => {
    return (
        <section className={styles.view}>
            <BurgerIngredients/>
            <BurgerConstructor/>
        </section>
    );
};

export default BurgerConstructorView;
