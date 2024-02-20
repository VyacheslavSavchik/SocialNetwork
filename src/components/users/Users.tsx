import React from 'react';
import {UsersType} from "../../Redux/users-reducer";
import {Paginator} from "../common/Paginator/Paginator"
import {User} from "./User"

type PropsType = {
    totalUsersCount: number
    users: UsersType[]
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    toggleFollowingProgress: (isFetching: boolean, userId: string) => void
    followingProgress: Array<string>
    follow: (userId: string) => void
    unFollow: (userId: string) => void
    portionSize: number
}

export const Users = ({totalUsersCount, pageSize, currentPage, onPageChanged, users, ...props}: PropsType) => {


    return (
        <div>
            <Paginator totalItemsCount={totalUsersCount}
                       pageSize={pageSize}
                       currentPage={currentPage}
                       onPageChanged={onPageChanged}
                       portionSize={props.portionSize}
            />
            <div>
                {
                    users.map(u => <User
                        unFollow={props.unFollow}
                        follow={props.follow}
                        followingProgress={props.followingProgress}
                        user={u}
                        key={u.id}/>
                    )
                }
            </div>
        </div>
    )

};

