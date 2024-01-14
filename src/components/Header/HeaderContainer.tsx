import React from 'react';
import Header from "./Header";
import {AppStateType} from "../../Redux/redux-store";
import {connect} from "react-redux";
import {logout} from "../../Redux/auth-reducer";
import {compose} from "redux";


export type MapStatePropsType = {
    isAuth: boolean
    login: string | null
}

export type MapDispatchPropsType = {
    logout: () => void
}

export type PropsType = MapStatePropsType & MapDispatchPropsType

class HeaderContainer extends React.Component<PropsType, AppStateType> {


    render() {
        return <Header {...this.props}/>
    };
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {logout})
)(HeaderContainer)
