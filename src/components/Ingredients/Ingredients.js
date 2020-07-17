import React, { useState, useEffect } from 'react'

import IngredientForm from './IngredientForm'
import IngredientList from './IngredientList'

import * as c from '../../shared/const'

import Search from './Search'

const Ingredients = (props) => {

    const [userIngredients, setUserIngredients] = useState([]) // array is used because it's a list of ings

    // HTTP-requests are typical side-effects
    // Gets executed right AFTER the (and for EVERY) render cycle
    useEffect(() => {
        // get requests are executed by default. I.e. no need to specify method
        fetch(c.DB_URL + 'ingredients.json' )
            .then(resp => {
                return resp.json()
            })
            .then(respData => {
                // Firebase returns an object, that needs to be converted into an array:
                let loadedIngredients = []
                for (let key in  respData) {
                    loadedIngredients.push({
                        id: key,
                        title: respData[key].title,
                        amount: respData[key].amount,
                    })
                }
                // After the conversion is done, setUserIngredients is called using our new array to populate the state
                setUserIngredients(loadedIngredients)
            })
            .catch(err => {
                console.log(err)
            })
    },[])

    const addIngredientHandler = (ingredient) => {
        // body is JSON data
        // No id, because Firebase will generate it
        fetch(c.DB_URL + 'ingredients.json', {
            method: 'post',
            body: JSON.stringify(ingredient),
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