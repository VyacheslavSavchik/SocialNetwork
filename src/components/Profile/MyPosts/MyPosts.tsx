import React from 'react';
import s from './MyPosts.module.css'
import Post from './Post/Post';
import {MyPostsPropsType} from "./MyPostContainers";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required,} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";


const MyPosts = (props: MyPostsPropsType) => {


    const postsElements =
        props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} id={p.id}/>);

    const onAddPost = (values: formDataType) => {
            //props.dispatch({type: 'ADD-POST'})
        //props.dispatch({type: "ADD-POST", postText: props.newPost })
        props.addPost(values.newPostText)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
           <AddNewPostFormRedux onSubmit={onAddPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
};



type formDataType = {
    ProfileAddNewPostForm: string
    newPostText: string
}

const maxLength30 = maxLengthCreator(30)
const AddNewPostForm:React.FC<InjectedFormProps<formDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
        <div>
            <Field name='newPostText' component={Textarea} placeholder='Post message' validate={[required, maxLength30]}/>
        </div>
        <div>
            <button>Add post</button>
        </div>
    </form>
    )
}
const AddNewPostFormRedux = reduxForm<formDataType>({form: 'ProfileAddNewPostForm'})(AddNewPostForm)

export default MyPosts;


// const newPostElement = React.createRef<HTMLTextAreaElement>();
