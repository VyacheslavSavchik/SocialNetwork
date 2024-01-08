import React from 'react';
import s from "./Users.module.css";
import userPhoto from "../../assets/images/image.png";
import {followSuccess, unfollowSuccess, UsersType} from "../../Redux/users-reducer";
import {NavLink} from "react-router-dom";
import {usersAPI} from "../../api/api";

type PropsType = {
    totalUsersCount: number
    users: UsersType[]
    pageSize: number
    currentPage: number
    //followSuccess: (userId: string) => void
    //unfollowSuccess: (userId: string) => void
    //setUsers: (users: UsersType[]) => void
    onPageChanged: (pageNumber: number) => void
    //setTotalCount: (totalCount: number) => void
    toggleFollowingProgress: (isFetching: boolean, userId: string) => void
    followingProgress: Array<string>
    follow: (userId: string) => void
    unFollow: (userId: string) => void
}

export const Users = (props: PropsType) => {
    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for(let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
        <div>
            <div>
                {pages.map(p => {
                    return <span className={props.currentPage === p ? s.selectedPage : ''}
                                 onClick={(e) => {props.onPageChanged(p)}}>{p}</span>
                })}
            </div>
            {props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <NavLink to={'/profile/' + u.id}>
                        <img src={u.photos != null ? u.photos : userPhoto} className={s.userPhoto}/>
                    </NavLink>
                        </div>
                    <div>
                        {u.followed
                            ? <button disabled={props.followingProgress.some(id => id === u.id)}
                                      onClick={() => {props.follow(u.id)}}
                            >Follow</button>

                            : <button disabled={props.followingProgress.some(id => id === u.id)}
                                      onClick={() => {props.unFollow(u.id)}}
                            >Unfollow</button>}

                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{'u.location.country'}</div>
                        <div>{'u.location.city'}</div>
                    </span>
                </span>
            </div>)}
        </div>
    );
};

