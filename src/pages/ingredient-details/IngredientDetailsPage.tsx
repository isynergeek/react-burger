import styles from './IngredientDetailsPage.module.css';
import IngredientDetails from '../../components/ingredient-details/IngredientDetails';

const IngredientDetailsPage = () => {
  return (
    <section className={styles.Root}>
      <IngredientDetails/>
    </section>
  );
};

export default IngredientDetailsPage;
