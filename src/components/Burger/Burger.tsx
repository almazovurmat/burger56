import React, {useState} from 'react';
import Ingredient from "../Ingredient/Ingredient";
import { IngredientType } from "../../type";
import TotalPrice from "../TotalPrice/TotalPrice";

interface BurgerProps {
    selectedIngredient: IngredientType[] | null;
}

const Burger: React.FC<BurgerProps> = ({ selectedIngredient }) => {
    const [burgerIngredients, setBurgerIngredients] = useState<IngredientType[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(30);

    if (selectedIngredient && selectedIngredient !== burgerIngredients) {
        const countPrice = (): number => {
            return selectedIngredient.reduce((acc, ingredient) => {
                return acc + ingredient.price;
            }, 30);
        };

        setTotalPrice(countPrice());
        setBurgerIngredients(selectedIngredient);
    }

    return (
        <div>
            <div className="Burger">
                <div className="BreadTop">
                    <div className="Seeds1"></div>
                    <div className="Seeds2"></div>
                </div>
                {burgerIngredients && burgerIngredients.map((ingredient, index) => (
                    <Ingredient key={index} ingredient={ingredient} />
                ))}
                <div className="BreadBottom"></div>
            </div>
            <TotalPrice totalPrice={totalPrice} />
        </div>
    );
};

export default Burger;
