import React from 'react';
import './App.css';
import AppHeader from "./components/app-header/AppHeader";
import {CONSTRUCTOR_ITEM} from "./constants/navItems";
import AppMain from "./components/app-main/AppMain";
import BurgerConstructorView from "./components/burger-constructor-view/BurgerConstructorView";

function App() {
  return (
    <div className="App">
        <AppHeader activeItem={CONSTRUCTOR_ITEM}/>
        <AppMain>
            <BurgerConstructorView/>
        </AppMain>
    </div>
  );
}

export default App;
