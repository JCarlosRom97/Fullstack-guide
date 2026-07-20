import React, { useState, useContext } from "react";
import Card from "../../../shared/components/UIElements/Card/Card";
import Input from "../../../shared/components/FormElements/Input/Input";
import Button from "../../../shared/components/FormElements/Button/Button";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../../shared/utils/validators";
import { useForm } from "../../../shared/hooks/useForm";
import { AuthContext } from "../../../shared/Context/auth-context";
import './Auth.css'

const Auth = () => {

    const {login} = useContext(AuthContext);

    const [isLogin, setIsLogin] = useState(true);

    const { formState, inputHandler, setFormData } = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false);

    const authSubmitHandler = (e) => {
        e.preventDefault();
        console.log(formState);
        login();
    }

    const switchModeHandler = () => {
        if (!isLogin) {
            setFormData({
                ...formState.inputs,
               name: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid)
        }else{
            setFormData({
                ...formState.inputs,
                name:{
                    value:'',
                    isValid: false
                }
            }, false)
        }

        setIsLogin(prev => !prev)
    }

    return (
        <Card className='authentication'>
            <h2>Login required</h2>
            <hr />
            <form onSubmit={authSubmitHandler}>
                {!isLogin &&
                    <Input
                        element="input"
                        id='name'
                        type="text"
                        label="Your Name"
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                    />
                }
                <Input
                    element="input"
                    id="email"
                    type="email"
                    label="E-Mail"
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="Please enter a valid email address."
                    onInput={inputHandler}
                />
                <Input
                    element="input"
                    id="password"
                    type="password"
                    label="Password"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter a valid password, at least 5 characters."
                    onInput={inputHandler}
                />
                <Button type='submit' disabled={!formState.isValid}>{isLogin ? 'LOGIN' : 'SIGNUP'}</Button>
            </form>
            <Button inverse onClick={switchModeHandler}> SWITCH TO {isLogin ? 'SIGNUP' : 'LOGIN'}</Button>
        </Card>
    )
}

export default Auth; 