import React from 'react';
import { PostsType } from '../../../../Redux/profile-reducer';
import s from './Post.module.css'



const Post = (props: PostsType) => {
    return (
        <div className={s.item}>
            <img
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSefb1P3f0DPKFHKiY2w9a6dz4m_DCL94ENvg&usqp=CAU'/>
            {props.message}
            <div>
                <span>like {props.likesCount}</span>
            </div>
        </div>
    );
};

export default Post;