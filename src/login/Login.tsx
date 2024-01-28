import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {Input} from "../components/common/FormsControls/FormsControls";
import {required} from "../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../Redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../Redux/redux-store";
import {compose} from "redux";
import s from '.././components/common/FormsControls/FormsControls.module.css'

export type formDataType = {
    email: string
    password: string
    rememberMe: boolean
    isAuth: boolean
}

type MapStatePropsType = {
    isAuth: boolean
}

type MapDispatchPropsType = {
    login: (data: formDataType) => void
}

type LoginPropsType = formDataType & MapStatePropsType & MapDispatchPropsType

const LoginForm: React.FC<InjectedFormProps<formDataType>> = ({handleSubmit, error}) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/*{createField('Email',  'email', [required], Input)}*/}
                {/*{createField('Password',  'password', [required], Input, {type: 'password'})}*/}
                {/*{createField(undefined,  'rememberMe', Input, {type: 'checkbox'}, 'remember me')}*/}
                <div>
                    <Field placeholder={'Email'}
                           validate={[required]}
                           name={'email'}
                           component={Input}/>
                </div>
                <div>
                    <Field placeholder={'Password'}
                           validate={[required]}
                           name={'password'}
                           type={'password'}
                           component={Input}/>
                </div>
                <div>
                    <Field type={'checkbox'} name={'rememberMe'} component={Input}/> remember me
                </div>
                {error && <div className={s.formSummaryError}>
                    {error}
                </div>}
                <div>
                    <button>Login</button>
                </div>
            </form>
        </div>
    );
};

const LoginReduxForm = reduxForm<formDataType>({
    form: 'login'
})(LoginForm)

const Login = (props: LoginPropsType) => {
    const onSubmit = (formData: formDataType) => {
    props.login(formData)
    }

    if(props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default compose<JSX.Element>(connect(mapStateToProps, {login})(Login));