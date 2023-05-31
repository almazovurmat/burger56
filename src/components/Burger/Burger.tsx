import React, { useState, useEffect } from 'react';
import Ingredient from "../Ingredient/Ingredient";

interface IProps {
    ingredientName: string;
}

const Burger: React.FC<IProps> = ({ ingredientName }) => {
    const [burgerIngredients, setBurgerIngredients] = useState<string[]>([]);

    const setIngredientName = (name: string) => {
        setBurgerIngredients(prevIngredients => [...prevIngredients, name]);
    };

    useEffect(() => {
        setIngredientName(ingredientName);
    }, [ingredientName]);

    return (
        <div className="Burger">
            <div className="BreadTop">
                <div className="Seeds1"></div>
                <div className="Seeds2"></div>
            </div>
            {burgerIngredients.map((ingredient: string, index: number) => {
                return <Ingredient key={index} name={ingredient} />
            })}
            <div className="BreadBottom"></div>
        </div>
    );
};

export default Burger;