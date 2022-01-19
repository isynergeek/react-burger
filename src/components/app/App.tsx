import React, {useEffect, useReducer, useState} from 'react';
import styles from './App.module.css';
import AppHeader from "components/app-header/AppHeader";
import {NavItems} from "constants/navItems";
import AppMain from "components/app-main/AppMain";
import {getIngredients} from "api/Api";
import BurgerIngredients from "components/burger-ingredients/BurgerIngredients";
import BurgerConstructor from "components/burger-constructor/BurgerConstructor";
import {IngredientContext} from 'services/igredientContext';
import {BurgerConstructorContext, initialState, reducer} from "services/burgerConstructorContext";
import {IngredientTypes} from "../../constants/ingredientTypes";


function App() {
    const [ingredients, setIngredients] = useState<TIngredient[]>([]);
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        getIngredients()
            .then(data => {
                const ingredients: TIngredient[] = data.data;
                setIngredients(ingredients);
            })
            .catch(e => console.error('Ошибка! ', e))
    }, [])

    return (
        <div className={styles.main}>
            <AppHeader activeItem={NavItems.CONSTRUCTOR}/>
            <AppMain>
                {ingredients.length ?
                    (<section className={styles.ConstructorRoot}>
                        <BurgerConstructorContext.Provider value={{state, dispatch}}>
                            <IngredientContext.Provider value={ingredients}>
                                <BurgerIngredients/>
                            </IngredientContext.Provider>
                            <BurgerConstructor/>
                        </BurgerConstructorContext.Provider>
                    </section>) : <></>
                }
            </AppMain>
        </div>
    );
}

export type TIngredient = {
    calories: number,
    carbohydrates: number,
    fat: number,
    image: string,
    image_large: string,
    image_mobile: string,
    name: string,
    price: number,
    proteins: number,
    type: string,
    __v: number,
    _id: string,
}

export default App;
