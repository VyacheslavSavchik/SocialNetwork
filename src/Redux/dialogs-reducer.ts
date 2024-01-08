const SEND_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_BODY = 'CHANGE-MESSAGE-BODY';

export type InitStateType = typeof initialState

export type DialogsType = {
    id: number
    name: string
}

export type MessagesType = {
    message: string
    id: number
}

const initialState = {
    dialogs: [
        {id: 1, name: 'John'},
        {id: 2, name: 'Bim'},
        {id: 3, name: 'Lola'},
        {id: 4, name: 'Bob'},
        {id: 5, name: 'Reks'}
    ] as Array<DialogsType>,
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How is your code?'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'}
    ] as Array<MessagesType>,
    newMessageBody: ''
}
const dialogsReducer = (state: InitStateType = initialState, action: ActionsTypesOfDialogs): InitStateType  => {

    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            return {
                ...state,
                newMessageBody: action.body
            }
        case SEND_MESSAGE:
            let body = state.newMessageBody;
            return {
                ...state,
                newMessageBody: '',
                messages: [...state.messages, {id: 7, message: body}]
            }
        default:
            return state
    }
}

export const sendMessageCreator = () => ({
    type: SEND_MESSAGE
} as const)

export const updateNewMessageBodyCreator = (body: string) => ({
    type: UPDATE_NEW_MESSAGE_BODY,
    body: body
} as const)

export type ActionsTypesOfDialogs =
    ReturnType<typeof sendMessageCreator>
    | ReturnType<typeof updateNewMessageBodyCreator>

export default dialogsReducer;
