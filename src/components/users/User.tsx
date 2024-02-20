import React from 'react';
import s from "./Users.module.css";
import userPhoto from "../../assets/images/image.png";
import {UsersType} from "../../Redux/users-reducer";
import {NavLink} from "react-router-dom";

type PropsType = {
    followingProgress: Array<string>
    follow: (userId: string) => void
    unFollow: (userId: string) => void
    user: UsersType

}

export const User = ({user, followingProgress, follow, unFollow, ...props}: PropsType) => {
    return (
        <div>

                <span>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                    <img src={user.photos.small !== null ? user.photos.small : userPhoto} className={s.userPhoto}/>
                    </NavLink>
                        </div>
                    <div>
                        {user.followed
                            ? <button disabled={followingProgress.some(id => id === user.id)}
                                      onClick={() => {
                                          follow(user.id)
                                      }}
                            >Follow</button>

                            : <button disabled={followingProgress.some(id => id === user.id)}
                                      onClick={() => {
                                          unFollow(user.id)
                                      }}
                            >Unfollow</button>}

                    </div>
                </span>
            <span>
                    <span>
                        <div>{user.name}</div>
                    </span>
               <span>
                        <div>{user.status}</div>
               </span>
                </span>
        </div>
    )
};

