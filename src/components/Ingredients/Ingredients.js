import React, { useState } from 'react'

import IngredientForm from './IngredientForm'
import IngredientList from './IngredientList'

import Search from './Search'

const Ingredients = (props) => {

    const [userIngredients, setUserIngredients] = useState([]) // array is used because it's a list of ings

    const addIngredientHandler = (ingredient) => {
        setUserIngredients(prevIngredients => [
            ...prevIngredients,
            {
                id: Math.random().toString(),
                // Spread operator takes ALL key–value pairs from an old obj and adds them
                // as key–value pairs to the new object
                ...ingredient,
            },
        ])
    }

    return (
        <div className='App'>
            <IngredientForm
                onAddIngredient={addIngredientHandler}
                onRemoveItem={() => {}} />

            <section>
                <Search />
                <IngredientList ingredients={userIngredients} />
            </section>
        </div>
    )
}

export default Ingredients;