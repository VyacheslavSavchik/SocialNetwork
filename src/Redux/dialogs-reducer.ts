const SEND_MESSAGE = 'ADD-MESSAGE';

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
        {id: 2, name: 'Ed'},
        {id: 3, name: 'Molly'},
        {id: 4, name: 'Bob'},
        {id: 5, name: 'Alex'}
    ] as Array<DialogsType>,
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How is your code?'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'}
    ] as Array<MessagesType>,

}
const dialogsReducer = (state: InitStateType = initialState, action: ActionsTypesOfDialogs): InitStateType  => {

    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 7, message: body}]
            }
        default:
            return state
    }
}

export const sendMessageCreator = (newMessageBody: string) => ({
    type: SEND_MESSAGE,
    newMessageBody
} as const)


export type ActionsTypesOfDialogs =
    ReturnType<typeof sendMessageCreator>

export default dialogsReducer;
