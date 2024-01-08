import React, { ChangeEvent } from 'react';
import s from './MyPosts.module.css'
import Post from './Post/Post';
import {MyPostsPropsType} from "./MyPostContainers";


const MyPosts = (props: MyPostsPropsType) => {


    const postsElements =
        props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} id={p.id}/>);

    const onAddPost = () => {
            //props.dispatch({type: 'ADD-POST'})
        //props.dispatch({type: "ADD-POST", postText: props.newPost })
        props.addPost(props.newPostText)
    }

    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.currentTarget.value
        props.updateNewPostText(text)
    }
    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea
                        onChange={onPostChange}
                        value={props.newPostText}></textarea>
                </div>
                <div>
                    <button onClick={onAddPost}>Add post
                    </button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
};

export default MyPosts;


// const newPostElement = React.createRef<HTMLTextAreaElement>();
