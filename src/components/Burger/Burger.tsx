import React, { useState, useEffect } from 'react';
import Ingredient from "../Ingredient/Ingredient";
import { IngredientType } from "../../type";

interface BurgerProps {
    selectedIngredient: IngredientType | null;
}

const Burger: React.FC<BurgerProps> = ({ selectedIngredient }) => {
    const [burgerIngredients, setBurgerIngredients] = useState<IngredientType[]>([]);

    console.log(burgerIngredients);
    useEffect(() => {
        if (selectedIngredient) {
            setBurgerIngredients(prevIngredients => [...prevIngredients, selectedIngredient]);
        }
    }, [selectedIngredient]);

    return (
        <div className="Burger">
            <div className="BreadTop">
                <div className="Seeds1"></div>
                <div className="Seeds2"></div>
            </div>
            {burgerIngredients.map((ingredient, index) => (
                <Ingredient key={index} ingredient={ingredient} />
            ))}
            <div className="BreadBottom"></div>
        </div>
    );
};

export default Burger;
