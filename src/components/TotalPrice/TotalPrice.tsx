import React from 'react';

interface IProps {
    totalPrice: number
}
const TotalPrice: React.FC<IProps> = ({totalPrice}) => {
    return (
        <div className="totalPrice">
            <b>Total Price: </b> {totalPrice}
        </div>
    );
};

export default TotalPrice;