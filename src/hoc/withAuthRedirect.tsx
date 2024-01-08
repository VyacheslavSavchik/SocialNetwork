import React, {ComponentType} from "react";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../Redux/redux-store";
import {connect} from "react-redux";


type MapStatePropsType = {
    isAuth: boolean
}

const mapStateToPropsForRedirect = (state: AppStateType): MapStatePropsType => {
    return {
        isAuth: state.auth.isAuth
    }}
export function withAuthRedirect<T>(Component: ComponentType<T>){
    function RedirectComponent(props: MapStatePropsType) {
        let {isAuth, ...restProps} = props
        if (!isAuth) return <Redirect to='/login'/>
        return <Component {...restProps as T}/>
    }

    let connectedRedirectComponent = connect(mapStateToPropsForRedirect) (RedirectComponent)
    return connectedRedirectComponent
}