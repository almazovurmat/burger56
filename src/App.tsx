import React, {useState} from 'react';
import Burger from "./components/Burger/Burger";
import {IngredientType, IngredientType2} from "./type";
import './App.css';
import './assets/css/burger.css';
import './assets/css/style.css';
import meatImage from './assets/images/beef.png';
import cheeseImage from './assets/images/cheese.png';
import saladImage from './assets/images/salated.png';
import baconImage from './assets/images/bacon.png';


const App = () => {
    const INGREDIENTS: IngredientType[] = [
        {name: 'Meat', price: 80, image: meatImage},
        {name: 'Cheese', price: 50, image: cheeseImage},
        {name: 'Salad', price: 10, image: saladImage},
        {name: 'Bacon', price: 60, image: baconImage},
    ];

    const [ingredients, setIngredients] = useState<IngredientType2[]>(
        INGREDIENTS.map(ingredient => ({...ingredient, count: 0}))
    );

    const styles: React.CSSProperties = {
        width: "1400px",
        display: "flex",
        justifyContent: "space-between",
    };

    const [chosenIngredient, setChosenIngredient] = useState<IngredientType2[] | null>(null);

    const updateIngredientCount = (name: string, increment: number, isDelete: boolean = false) => {
        setChosenIngredient(prevIngredient => {
            if (prevIngredient) {
                const index = prevIngredient.findIndex(item => item.name === name);
                if (index !== -1) {
                    const updatedIngredient = {
                        ...prevIngredient[index],
                        count: prevIngredient[index].count + increment
                    };
                    const updatedIngredients = [...prevIngredient];
                    updatedIngredients[index] = updatedIngredient;
                    return updatedIngredients;
                }
            }
            return prevIngredient;
        });
    };

    const deleteOneIngredientCount = (chosenIngredient: IngredientType2) => {
        setChosenIngredient(prevState => {
            if (prevState) {
                const ingredientIndex = prevState.findIndex(
                    ingredient => ingredient.name === chosenIngredient.name
                );
                if (ingredientIndex !== -1) {
                    const updatedIngredients = [...prevState];
                    updatedIngredients.splice(ingredientIndex, 1);
                    return updatedIngredients;
                }
            }
            return prevState;
        });
    };

    const refresh = (chosenIngredient: IngredientType2, increment: number) => {
        const updatedIngredients = ingredients.map((ingredient) => {
            if(chosenIngredient.name === ingredient.name) {
                return {...ingredient, count: ingredient.count +  increment};
            }
            return ingredient;
        });

        setIngredients(updatedIngredients);
    };

    const itemClick = (chosenIngredient: IngredientType2) => {
        setChosenIngredient(prevState => {
            if (prevState) {
                const updatedIngredients = [...prevState, chosenIngredient];
                return updatedIngredients;
            }
            return [chosenIngredient];
        });
    };

    return (
        <div style={styles}>
            <div className="side">
                <h3 className="blockTitle">Ingredient</h3>
                {
                    ingredients.map(item => {
                        return (
                            <div key={item.name}>
                                <span className="ingredients" onClick={() => {
                                    itemClick(item);
                                    updateIngredientCount(item.name, 1);
                                    refresh(item, 1);
                                }}>
                                    <img className="ingredientItem" src={item.image} alt={item.name}/>
                                    <span className="ingredientName">{item.name}</span>
                                </span>
                                <span className="counterItem">{item.count > 0 ? item.count : 0}</span>
                                <button className="deleteItem" onClick={() => {
                                    deleteOneIngredientCount(item);
                                    refresh(item, -1);
                                }}>Delete
                                </button>
                            </div>
                        )
                    })
                }
            </div>
            <div className="side">
                <h3 className="blockTitle">Burger</h3>
                <Burger selectedIngredient={chosenIngredient}/>
            </div>
        </div>
    );
};

export default App;
