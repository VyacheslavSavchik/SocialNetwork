import React from 'react';
import Header from "./Header";
import {AppStateType} from "../../Redux/redux-store";
import {connect} from "react-redux";
import {getAuthUserDataThunk} from "../../Redux/auth-reducer";


type MapStatePropsType = {
    isAuth: boolean
    login: string
}

type MapDispatchPropsType = {
    getAuthUserDataThunk: () => void
}

export type PropsType = MapStatePropsType & MapDispatchPropsType

class HeaderContainer extends React.Component<PropsType, AppStateType> {
    componentDidMount() {
        this.props.getAuthUserDataThunk()
    }

    render() {
        return <Header {...this.props}/>
    };
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})
export default connect(mapStateToProps, {getAuthUserDataThunk})(HeaderContainer);