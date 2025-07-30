import { useReducer } from 'react'
import type { ReactNode, ChangeEvent } from 'react'

const initState = { count: 0, text: '' };

const enum REDUCER_ACTION_TYPE {
    INCREMENT,
    DECREMENT,
    NEW_INPUT,
    DOUBLER,
    RESET
}

type ReducerAction = {
    type: REDUCER_ACTION_TYPE,
    payload?: string
}

const reducer = (state: typeof initState, action: ReducerAction): typeof initState => {
    switch (action.type) {
        case REDUCER_ACTION_TYPE.INCREMENT:
            return {...state, count: state.count + 1}
        case REDUCER_ACTION_TYPE.DECREMENT:
            return {...state, count:state.count -1}
        case REDUCER_ACTION_TYPE.NEW_INPUT:
            return { ...state, text: action.payload ?? ''}
        case REDUCER_ACTION_TYPE.DOUBLER:
            return {...state, count: state.count * 2}
        case REDUCER_ACTION_TYPE.RESET:
            return initState;
        default: 
            throw new Error();

    }
}

type ChildrenType = {
    children: (num: number) => ReactNode;
}


const Counter = ({children} : ChildrenType) => {
    //const [count, setCount] = useState<number>(1);
    const [state, dispatch] = useReducer(reducer, initState);

    const increment = () => dispatch({type: REDUCER_ACTION_TYPE.INCREMENT});
    const decrement = () => dispatch({type: REDUCER_ACTION_TYPE.DECREMENT});
    const handleTextInput = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: REDUCER_ACTION_TYPE.NEW_INPUT, payload: e.target.value})
    }
    const doubler = () => dispatch({type: REDUCER_ACTION_TYPE.DOUBLER});
    const reset = () => dispatch({type: REDUCER_ACTION_TYPE.RESET})
    
    return (
        <>
            <h1>{children(state.count)}</h1>
            <div>
                <button onClick = {increment}>+</button>
                <button onClick = {decrement}>-</button>
                <button onClick = {doubler}>Double</button>
                <button onClick = {reset}>Reset</button>
            </div>
            <input type='text' onChange = {handleTextInput}/>
            <h2>{state.text}</h2>
        </>

    )
}

export default Counter;