import { useEffect } from 'react';
import styles from './App.module.css';
import AppHeader from 'components/app-header/AppHeader';
import { NavItems } from 'constants/navItems';
import AppMain from 'components/app-main/AppMain';
import BurgerIngredients from 'components/burger-ingredients/BurgerIngredients';
import BurgerConstructor from 'components/burger-constructor/BurgerConstructor';
import { getItems } from '../../services/actions/burgerIngredients';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
    const dispatch = useAppDispatch();
    const {items} = useAppSelector(state => state.burgerIngredients);

    useEffect(() => {
        dispatch(getItems());
    }, [])


    return (
        <div className={styles.main}>
            <AppHeader activeItem={NavItems.CONSTRUCTOR} />
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
        </div>
    );
}

export default App;
