import React from 'react';
import {addPostCreator, PostsType, updateNewPostTextCreator} from "../../../Redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../Redux/redux-store";
import {Dispatch} from "redux";



type mapStatePropsType = {
    posts: PostsType[]
    newPostText: string
}

type mapDispatchPropsType = {
    addPost: (postText: string) => void
    updateNewPostText: (text: string) => void
}

export type MyPostsPropsType = mapStatePropsType & mapDispatchPropsType

const mapStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchPropsType => {
    return {
        addPost: (postText) => {
            dispatch(addPostCreator(postText))
        },
        updateNewPostText: (text) => {
            let action = updateNewPostTextCreator(text);
            dispatch(action)
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);
export default MyPostsContainer;




/*const MyPostsContainer = () => {


    // const newPostElement = React.createRef<HTMLTextAreaElement>();

return(
    <StoreContext.Consumer>
        {store => {
            const state = store.getState()

            const addPost = () => {
            //props.dispatch({type: 'ADD-POST'})
            //props.dispatch({type: "ADD-POST", postText: props.newPost })
            state.dispatch(addPostCreator(state.newPost))
        }

            const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
                let text = e.currentTarget.value
                let action = updateNewPostTextCreator(text);
                // let action = {type: 'UPDATE-NEW-POST-TEXT', newText: text}
                //props.dispatch(action)
                // props.dispatch({type: 'UPDATE-NEW-POST-TEXT', newText: text})
                state.dispatch(action)
            }
            return <MyPosts updateNewPostText={onPostChange}
            addPost={addPost}
            posts={state.profilePage.posts}
            newPost={state.profilePage.newPostText}/>
        }
        }
    </StoreContext.Consumer>
);
};*/
