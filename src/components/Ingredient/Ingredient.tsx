import React from 'react';
import {IngredientType} from "../../type";

interface IProps {
    ingredient: IngredientType;
}
const Ingredient: React.FC<IProps> = ({ingredient}) => {

    return (
        <div className={ingredient.name}></div>
    );
};

export default Ingredient;