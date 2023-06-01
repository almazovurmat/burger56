import React, {useCallback, useEffect, useState} from 'react';
import Burger from "./components/Burger/Burger";
import TotalPrice from "./components/TotalPrice/TotalPrice";
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
        {name: 'Salad', price: 10, image: saladImage, count: 0},
        {name: 'Bacon', price: 60, image: baconImage, count: 0},
    ]);

    const styles: React.CSSProperties = {
        width: "1400px",
        display: "flex",
        justifyContent: "space-between",
    };

    const [chosenIngredient, setChosenIngredient] = useState<IngredientType[] | null>(null);
    const [chosenIngredientForDelete, setChosenIngredientForDelete] = useState<IngredientType | null>(null);
    const [allChosenIngredient, setAllChosenIngredient] = useState<IngredientType[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(30);

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

    const deleteOneIngredientCount = (chosenIngredient: IngredientType) => {
        setChosenIngredientForDelete(chosenIngredient);
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
        setChosenIngredient(prevState => {
            if (prevState) {
                const updatedIngredients = [...prevState, chosenIngredient];
                return updatedIngredients;
            }
            return [chosenIngredient];
        });

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

    const countPrice = useCallback((): number => {
        if (chosenIngredient) {
            return chosenIngredient.reduce((acc, ingredient) => {
                return acc + ingredient.price;
            }, 30)
        }
        return 30;
    }, [chosenIngredient]);

    useEffect(() => {
        setTotalPrice(countPrice());
    }, [chosenIngredient, countPrice]);

    useEffect(() => {
        const updatedIngredients = INGREDIENTS.map((ingredient) => {
            const matchingChosenIngredient = allChosenIngredient.find((chosenIngredient) => chosenIngredient.name === ingredient.name);
            if (matchingChosenIngredient) {
                return { ...ingredient, count: matchingChosenIngredient.count };
            }
            return ingredient;
        });

        setINGREDIENTS(updatedIngredients);
    }, [allChosenIngredient, chosenIngredient, chosenIngredientForDelete]);

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
                                    <b>{}</b>
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
                <Burger selectedIngredient={chosenIngredient}/>
                <TotalPrice totalPrice={totalPrice}/>
            </div>
        </div>
    );
};

export default App;
