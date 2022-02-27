import styles from '../../components/app/App.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../../components/burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../../components/burger-constructor/BurgerConstructor';
import AppMain from '../../components/app-main/AppMain';
import { useAppSelector } from '../../services/hooks';

const HomePage = () => {
  const {items} = useAppSelector(state => state.burgerIngredients);

  return (
    <AppMain>
      {items.length ?
        (<section className={styles.ConstructorRoot}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </section>) : <></>
      }
    </AppMain>
  );
};

export default HomePage;
