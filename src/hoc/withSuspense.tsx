import React, {ComponentType, Suspense} from "react";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../Redux/redux-store";
import {connect} from "react-redux";
import {Preloader} from "../components/common/Preloader/Preloader"

type PropsType = {}
//
// type MapStatePropsType = {
//     isAuth: boolean
// }
//
// const mapStateToPropsForRedirect = (state: AppStateType): MapStatePropsType => {
//     return {
//         isAuth: state.auth.isAuth
//     }}
export function withSuspense<T>(Component: ComponentType<T>){

    return (props: PropsType) => {
        return <Suspense fallback={<Preloader/>}><Component {...props as T}/></Suspense>
    }

}
//     function RedirectComponent(props: MapStatePropsType) {
//         let {isAuth, ...restProps} = props
//         if (!isAuth) return <Redirect to='/login'/>
//         return <Component {...restProps as T}/>
//     }
//
//     let connectedRedirectComponent = connect(mapStateToPropsForRedirect) (RedirectComponent)
//     return connectedRedirectComponent
//}