import React from 'react';

interface IProps {
    name: string
}
const Ingredient: React.FC<IProps> = ({name}) => {

    return (
        <div className={name}></div>
    );
};

export default Ingredient;