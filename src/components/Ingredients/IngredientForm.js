import React, { useState } from 'react'

import Card from '../UI/Card'
import './IngredientForm.css'

const IngredientForm = React.memo(props => {

    /* --------------------------------------------------
    Use state can be initialised with a default state:
    It can be an object, value, etc.
    This is an important difference from 'normal' state
    In class-based components, state HAS to be an object
    -------------------------------------------------- */

    // useState always returns an array with two elements:
    // current state snapshot, and a function to update the currnet state

    // const inputState =
    //     useState({
    //         title: '',
    //         amount: '',
    //     })

    // Array destructuring
    const [ inputState, setInputState] = useState({ title: '', amount: '' })



    const submitHandler = event => {
        event.preventDefault()
        // ...
    }

    // First element of the array is the snapshot of the current state
    // const { title, amount } = inputState[0]
    const { title, amount } = inputState

    return (
        <section className='ingredient-form'>
            <Card>
                <form onSubmit={submitHandler}>
                    <div className='form-control'>
                        <label htmlFor='title'>Name</label>
                        <input
                            type='text'
                            id='title'
                            value={title}
                            // Hooks DON'T merge the state, but 're-create' it !!!
                            // prevInputState allows us to access previous input state
                            onChange={event => {
                                // creating a const, will help to bypass the closure:
                                // React won't save and re-use the old event
                                const newTitle = event.target.value
                                // inputState[1](prevInputState => ({
                                setInputState(prevInputState => ({
                                title: newTitle,
                                amount: prevInputState.amount,
                            }))}} />
                    </div>
                    <div className='form-control'>
                        <label htmlFor='amount'>Amount</label>
                        <input
                            type='number'
                            id='amount'
                            value={amount}
                            onChange={event => {
                                // creating a const, will help to bypass the closure:
                                // React won't save and re-use the old event
                                // Closure will happen on the new expression
                                const newAmount = event.target.value
                                // inputState[1](prevInputState => ({
                                setInputState(prevInputState => ({
                                    title: prevInputState.title,
                                    amount: newAmount,
                                }))
                            }} />
                    </div>
                    <div className='ingredient-form__actions'>
                        <button type='submit'>Add Ingredient</button>
                    </div>
                </form>
            </Card>
        </section>
    );
});

export default IngredientForm