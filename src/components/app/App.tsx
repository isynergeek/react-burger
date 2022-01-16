import React, {useEffect, useState} from 'react';
import styles from './App.module.css';
import AppHeader from "components/app-header/AppHeader";
import {NavItems} from "constants/navItems";
import AppMain from "components/app-main/AppMain";
import {getIngredients} from "api/Api";
import BurgerIngredients from "components/burger-ingredients/BurgerIngredients";
import BurgerConstructor from "components/burger-constructor/BurgerConstructor";

function App() {

    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        getIngredients()
            .then(data => {
                setIngredients(data.data);
                setDataLoaded(true)
            })
            .catch(e => console.error('Ошибка! ', e))
    }, [])

    return (
        <div className={styles.main}>
            <AppHeader activeItem={NavItems.CONSTRUCTOR}/>
            <AppMain>
                {dataLoaded ?
                    (<section className={styles.ConstructorRoot}>
                        <BurgerIngredients ingredients={ingredients}/>
                        <BurgerConstructor ingredients={ingredients}/>
                    </section>) : <></>
                }
            </AppMain>
        </div>
    );
}

export default App;
