import React from 'react';

import './IngredientList.css'

const IngredientList = props => {
    return (
        <section className='ingredient-list'>
            <h2>Loaded Ingredients</h2>
            <ul>
                {props.ingredients.map(ig => {
                    const { id, title, amount } = ig
                    return (
                        <li key={id}
                            // onClick={props.onRemoveItem.bind(this, id)}
                        >
                            <span>{title}</span>
                            <span>{amount}x</span>
                        </li>)
                    })}
            </ul>
        </section>
    );
};

export default IngredientList