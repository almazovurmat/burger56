import React, {useState} from 'react';
import Burger from "./components/Burger/Burger";
import {Ingredient} from "./type";
import './App.css';
import './assets/css/burger.css';
import './assets/css/style.css';
import meatImage from './assets/images/beef.png';
import cheeseImage from './assets/images/cheese.png';
import saladImage from './assets/images/salated.png';
import baconImage from './assets/images/bacon.png';


const INGREDIENTS: Ingredient[] = [
    {name: 'Meat', price: 80, image: meatImage},
    {name: 'Cheese', price: 50, image: cheeseImage},
    {name: 'Salad', price: 50, image: saladImage},
    {name: 'Bacon', price: 50, image: baconImage},
];

const App = () => {
    const styles: React.CSSProperties = {
        width: "1400px",
        display: "flex",
        justifyContent: "space-between",
    };

    const [ingredientName, setingredientName] = useState <string>('');

    const itemClick = (name: string) => {
        setingredientName(name);
    }

    return (
        <div style={styles}>
            <div className="side">
                <h3 className="blockTitle">Ingredient</h3>
                {
                    INGREDIENTS.map(item => {
                        return (
                            <div key={item.name} onClick={() => {
                                itemClick(item.name);
                            }}>
                                <img className="ingredientItem" src={item.image} alt={item.name}/>
                                <span>{item.name}</span>
                                <span className="counterItem"></span>
                            </div>
                        )
                    })
                }
            </div>
            <div className="side">
                <h3 className="blockTitle">Burger</h3>
                <Burger ingredientName={ingredientName} />
            </div>
        </div>
    );
};

export default App;
