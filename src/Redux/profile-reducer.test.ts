import profileReducer, {addPostCreator, deletePost, InitialStateType} from "./profile-reducer"

const state: InitialStateType = {
    newPostText: 'change me',
    status: '',
    isOwner: false,
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 15},
        {id: 2, message: 'It\'s my first post', likesCount: 30},
    ],
    profile: {
        aboutMe: null,
        contacts: {
            facebook: null,
            website: null,
            vk: null,
            twitter: null,
            instagram: null,
            youtube: null,
            github: null,
            mainLink: null
        },
        lookingForAJob: true,
        lookingForAJobDescription: null,
        fullName: '',
        userId: '',
        photos: {
            small: '',
            large: ''
        }
    }
}


it('length of posts should be incremented', () => {
    const action = addPostCreator('YoYo')

    const newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(3)
    expect(newState.posts[2].message).toBe('YoYo')
})

it('message of new posts should be correct', () => {
    const action = addPostCreator('YoYo')

    const newState = profileReducer(state, action)

    expect(newState.posts[2].message).toBe('YoYo')
})

it('after deleting length of messages should be decrement', () => {
    const action = deletePost(1)

    const newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(1)
})

it(`after deleting length shouldn't be decrement if id is not incorrect`, () => {
    const action = deletePost(1000)

    const newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(2)
})


