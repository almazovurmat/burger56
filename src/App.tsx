import React from 'react';
import Burger from "./components/Burger/Burger";
import './App.css';

function App() {
    const styles: React.CSSProperties = {
        width: "1400px",
        display: "flex",
        justifyContent: "space-between",
    };

    return (
        <div style={styles}>
            <div className="side ingredient-side">
                <h3 className="blockTitle">Ingredient</h3>
            </div>
            <div className="side burder-side">
                <h3 className="blockTitle">Burger</h3>
                <Burger />
            </div>
        </div>
    );
}

export default App;
