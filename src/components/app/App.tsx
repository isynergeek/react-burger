import React from 'react';
import styles from './App.module.css';
import AppHeader from "../app-header/AppHeader";
import {NavItems} from "../../constants/navItems";
import AppMain from "../app-main/AppMain";
import BurgerConstructorView from "../burger-constructor-view/BurgerConstructorView";

function App() {
  return (
    <div className={styles.main}>
        <AppHeader activeItem={NavItems.CONSTRUCTOR}/>
        <AppMain>
            <BurgerConstructorView/>
        </AppMain>
    </div>
  );
}

export default App;
