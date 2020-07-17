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
    // current state snapshot, and a function to update the current state

    // const inputState =
    //     useState({
    //         title: '',
    //         amount: '',
    //     })

    // Array destructuring
    // const [ inputState, setInputState] = useState({ title: '', amount: '' })

    // Because useState doesn't require an object and doesn't merge state,
    // It's better to use multiple states:

    const [enteredTitle, setEnteredTitle]   = useState('')
    const [enteredAmount, setEnteredAmount] = useState('')

    const submitHandler = event => {
        const { onAddIngredient } = props

        event.preventDefault()
        onAddIngredient({
            title: enteredTitle,
            amount: enteredAmount,
        })

    }

    // First element of the array is the snapshot of the current state
    // const { title, amount } = inputState[0]
    // const { title, amount } = inputState

    return (
        <section className='ingredient-form'>
            <Card>
                <form onSubmit={submitHandler}>
                    <div className='form-control'>
                        <label htmlFor='title'>Name</label>
                        <input
                            type='text'
                            id='title'
                            // value={title}
                            value={enteredTitle}
                            // Hooks DON'T merge the state, but 're-create' it !!!
                            // prevInputState allows us to access previous input state
                            onChange={event => {
                                // creating a const, will help to bypass the closure:
                                // React won't save and re-use the old event
                                // const newTitle = event.target.value
                                // inputState[1](prevInputState => ({
                                // setInputState(prevInputState => ({
                                //     title: newTitle,
                                //     amount: prevInputState.amount,
                                // }))

                                // No inner closure

                                setEnteredTitle(event.target.value)
                            }} />
                    </div>
                    <div className='form-control'>
                        <label htmlFor='amount'>Amount</label>
                        <input
                            type='number'
                            id='amount'
                            // value={amount}
                            value={enteredAmount}
                            onChange={event => {
                                // creating a const, will help to bypass the closure:
                                // React won't save and re-use the old event
                                // Closure will happen on the new expression
                                // const newAmount = event.target.value
                                // inputState[1](prevInputState => ({
                                // setInputState(prevInputState => ({
                                //     title: prevInputState.title,
                                //     amount: newAmount,
                                // }))

                                // No inner closure

                                setEnteredAmount(event.target.value)
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