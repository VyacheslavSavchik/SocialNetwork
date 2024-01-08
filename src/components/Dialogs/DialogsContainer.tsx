import {InitStateType, sendMessageCreator, updateNewMessageBodyCreator} from "../../Redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import {Dispatch} from "redux";
import {Redirect} from "react-router-dom";
import React from "react";
import {ProfileContainerPropsType} from "../Profile/ProfileContainer";
import AuthReducer from "../../Redux/auth-reducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


type mapStatePropsType = {
    dialogsPage: InitStateType
}

type mapDispatchPropsType = {
    updateNewMessageBody: (body: string) => void
    sendMessage: () => void
}

export type DialogsPropsType = mapStatePropsType & mapDispatchPropsType


const mapStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage
    }
}

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchPropsType => {
    return {
        updateNewMessageBody: (body) => {
            dispatch(updateNewMessageBodyCreator(body))
        },
        sendMessage: () => {
            dispatch(sendMessageCreator())
        }
    }
}

let AuthRedirectComponent = withAuthRedirect(Dialogs)


const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

export default DialogsContainer;

