import React, {useReducer, useEffect} from "react";
import './Input.css';
import { validate } from '../../../utils/validators';
import { Validator } from '../../../utils/validators';

interface InputType {
    value?: string,
    valid?: boolean,
    label:string, 
    id?: string, 
    element?: string, 
    type?:string, 
    placeholder?:string, 
    rows?:number, 
    errorText?:string,
    validators?: Validator[];
    onInput?: (id, value, isValid) => void
}

const inputReducer = (state, action) =>{
    switch(action.type){
        case 'CHANGE':            
            
            return {...state,
                value: action.val, 
                isValid: validate(action.val, action.validators)
            };

        case 'TOUCH':
            return {...state, isTouched: true}
        default: 
            return state
    }
}

const Input = ({value, label, id, element, type, placeholder, rows, errorText, validators, valid,  onInput}: InputType) =>{

    const [inputState, dispatch] = useReducer(inputReducer,{value:value || '', isValid: valid || false, isTouched: false});

    const changeHandler = (e) =>{
        dispatch({type:'CHANGE', val: e.target.value, validators})
    }

    const touchHandler = ()=>{
        dispatch({type:'TOUCH'})
    }

    useEffect(()=>{
        onInput?.(id, inputState.value, inputState.isValid);
    },[id, inputState, onInput]);

    const input = element === 'input' ? 
        <input id={id} type={type} placeholder={placeholder} onChange={changeHandler} value={inputState.value} onBlur={touchHandler}/> : 
        <textarea id={id} rows={rows | 3} onChange={changeHandler} value={inputState.value} onBlur={touchHandler}/>

    return <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
        <label htmlFor={id}>{label}</label>
        {input}
        {!inputState.isValid && <p>{errorText}</p>}
    </div>
}
export default Input; 