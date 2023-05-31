import React, {useEffect, useState} from 'react';
import Burger from "./components/Burger/Burger";
import {IngredientType} from "./type";
import './App.css';
import './assets/css/burger.css';
import './assets/css/style.css';
import meatImage from './assets/images/beef.png';
import cheeseImage from './assets/images/cheese.png';
import saladImage from './assets/images/salated.png';
import baconImage from './assets/images/bacon.png';


const App = () => {
    const [INGREDIENTS, setINGREDIENTS] = useState<IngredientType[]>([
        {name: 'Meat', price: 80, image: meatImage, count: 0},
        {name: 'Cheese', price: 50, image: cheeseImage, count: 0},
        {name: 'Salad', price: 50, image: saladImage, count: 0},
        {name: 'Bacon', price: 50, image: baconImage, count: 0},
    ]);

    const styles: React.CSSProperties = {
        width: "1400px",
        display: "flex",
        justifyContent: "space-between",
    };

    const [chosenIngredient, setChosenIngredient] = useState<IngredientType | null>(null);
    const [chosenIngredientForDelete, setChosenIngredientForDelete] = useState<IngredientType | null>(null);
    const [allChosenIngredient, setAllChosenIngredient] = useState<IngredientType[]>([]);

    const updateIngredientCount = (name: string, increment: number, isDelete: boolean = false) => {
        setChosenIngredient(prevIngredient => {
            if (prevIngredient && prevIngredient.name === name) {
                const updatedIngredient = {...prevIngredient, count: prevIngredient.count + increment};
                return updatedIngredient;
            }
            return prevIngredient;
        });
    };

    const deleteOneIngredientCount = (chosenIngredient: IngredientType) => {
        setChosenIngredientForDelete(chosenIngredient);
        setChosenIngredient(null);
        setAllChosenIngredient(prevState => {
            const ingredientIndex = prevState.findIndex(
                ingredient => ingredient.name === chosenIngredient.name
            );

            if (ingredientIndex !== -1) {
                const updatedIngredients = [...prevState];
                if (updatedIngredients[ingredientIndex].count > 0) {
                    updatedIngredients[ingredientIndex] = {
                        ...updatedIngredients[ingredientIndex],
                        count: updatedIngredients[ingredientIndex].count - 1,
                        isDelete: true
                    };

                    return updatedIngredients;
                }
            }
            return [...prevState];
        });

    };

    const itemClick = (chosenIngredient: IngredientType) => {
        setChosenIngredient(chosenIngredient);
        setAllChosenIngredient(prevState => {
            const ingredientIndex = prevState.findIndex(
                ingredient => ingredient.name === chosenIngredient.name
            );
            if (ingredientIndex !== -1) {
                const updatedIngredients = [...prevState];
                updatedIngredients[ingredientIndex] = {
                    ...updatedIngredients[ingredientIndex],
                    count: updatedIngredients[ingredientIndex].count + 1
                };
                return updatedIngredients;
            }
            return [...prevState, {...chosenIngredient, count: 1}];
        });
    }

    useEffect(() => {
        const ingredientsCount = allChosenIngredient.reduce((count, ingredient) => {
            if (ingredient.name === chosenIngredientForDelete?.name && ingredient.isDelete) {
                return ingredient.count ;
            } else {
                if (ingredient.name === chosenIngredient?.name) {
                    return count + ingredient.count;
                } else {
                    return count;
                }
            }
        }, 0);

        const updatedIngredients = INGREDIENTS.map(ingredient => {
            if (ingredient.name === chosenIngredientForDelete?.name && ingredient.isDelete) {
                return {...ingredient, count: ingredientsCount};
            }
            if (ingredient.name === chosenIngredient?.name) {
                return {...ingredient, count: ingredientsCount};
            } else {
                return ingredient;
            }
        });

        setINGREDIENTS(updatedIngredients);
    }, [allChosenIngredient, chosenIngredient]);
    return (
        <div style={styles}>
            <div className="side">
                <h3 className="blockTitle">Ingredient</h3>
                {
                    INGREDIENTS.map(item => {
                        return (
                            <div key={item.name}>
                                <span onClick={() => {
                                    itemClick(item);
                                    updateIngredientCount(item.name, 1);
                                }}>
                                    <img className="ingredientItem" src={item.image} alt={item.name}/>
                                    <span>{item.name}</span>
                                </span>
                                <span className="counterItem">{item.count > 0 ? item.count : 0}</span>
                                <button className="deleteItem" onClick={() => {
                                    item.isDelete = true;
                                    deleteOneIngredientCount(item);
                                }}>Delete
                                </button>
                            </div>
                        )
                    })
                }
            </div>
            <div className="side">
                <h3 className="blockTitle">Burger</h3>
                <Burger selectedIngredient={chosenIngredient} />
            </div>
        </div>
    );
};

export default App;
