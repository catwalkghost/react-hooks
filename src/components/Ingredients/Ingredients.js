import React, { useState } from 'react'

import IngredientForm from './IngredientForm'
import IngredientList from './IngredientList'

import * as c from '../../shared/const'

import Search from './Search'

const Ingredients = (props) => {

    const [userIngredients, setUserIngredients] = useState([]) // array is used because it's a list of ings

    const addIngredientHandler = (ingredient) => {

        // body is JSON data
        // No id, because Firebase will generate it
        fetch(c.DB_URL + 'ingredients.json', {
            method: 'post',
            body: JSON.stringify({ ingredient}),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(resp => {
                return resp.json()
            })
            .then(respData => {
                const { name } = respData
                setUserIngredients(prevIngredients => [
                    ...prevIngredients,
                    { id: name, ...ingredient }
                ])
            })
            .catch(err => {
                console.log(err)
            })

        // setUserIngredients(prevIngredients => [
        //     ...prevIngredients,
        //     {
        //         id: Math.random().toString(),
        //         // Spread operator takes ALL key–value pairs from an old obj and adds them
        //         // as key–value pairs to the new object
        //         ...ingredient,
        //     },
        // ])
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