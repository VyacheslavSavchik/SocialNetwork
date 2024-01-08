import react from 'react'
/*

export let store: StoreType = {
    _state: {
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'John'},
                {id: 2, name: 'Bim'},
                {id: 3, name: 'Lola'},
                {id: 4, name: 'Bob'},
                {id: 5, name: 'Reks'}
            ],
            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'How is your code?'},
                {id: 3, message: 'Yo'},
                {id: 4, message: 'Yo'},
                {id: 5, message: 'Yo'}
            ],
            newMessageBody: '',
        },
        profilePage: {
            newPostText: 'change me',
            posts: [
                {id: 1, message: 'Hi, how are you?', likesCount: 15},
                {id: 2, message: 'It\'s my first post', likesCount: 30},
            ],

        },
        sidebar: {}
    },
    getState() {
        return this._state;
    },
    _callSubscriber() {
        console.log('State changed')
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },
    dispatch(action) {


        this._callSubscriber();
    }
}

type StoreType = {
    _state: RootStateType
    subscribe: (observer: () => void) => void
    _callSubscriber: () => void
    getState: () => RootStateType
    dispatch: (action: ActionsTypesOfProfile | ActionsTypesOfDialogs) => void
}
*/





/*
export type ActionsTypes = ReturnType<typeof addPostCreator>
    | ReturnType<typeof updateNewPostTextCreator>
    | ReturnType<typeof sendMessageCreator>
    | ReturnType<typeof updateNewMessageBodyCreator>
*/


/*

type DialogsType = {
    id: number
    name: string
}
type MessagesType = {
    id: number
    message: string
}
type PostsType = {
    id: number
    message: string
    likesCount: number
}
type DialogsPageType = {
    dialogs: DialogsType[]
    messages: MessagesType[]
    newMessageBody: string
}
type ProfilePageType = {
    newPostText: string
    posts: PostsType[]
}
type SidebarType = {}
type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: SidebarType
}
*/


/*

export const addPost = (postText: string) => {
    const newPost: PostsType = {
        id: 5,
        message: postText != null ? postText : '----',
        likesCount: 0
    }
    state.profilePage.posts.push(newPost)
    state.profilePage.newPostText = '';
    rerenderEntireTree(state)
}
*/

/*export const updateNewPostText = (newText: string) => {
    state.profilePage.newPostText = newText;
    rerenderEntireTree(state)
}*/

/*export const subscribe = (observer: () => {}) => {
    rerenderEntireTree = observer
}*/
//window.store = store;

/*type AddPostActionType = {
    type: 'ADD-POST'
    postText: string
}*/
/*type UpdateNewPostTextActionType = {
    type: 'UPDATE-NEW-POST-TEXT'
    newText: string
}*/
