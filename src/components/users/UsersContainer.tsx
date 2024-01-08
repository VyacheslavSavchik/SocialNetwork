import React from 'react';
import {connect} from "react-redux";
import {
    follow,
    followSuccess,
    getUsers,
    setCurrentPage,
    toggleFollowingProgress, unFollow,
    unfollowSuccess,
    UsersType
} from "../../Redux/users-reducer";
import {AppStateType} from "../../Redux/redux-store";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

class UsersContainer extends React.Component<UsersPropsType, UsersType> {


    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                        users={this.props.users}
                        //setUsers={this.props.setUsers}
                        currentPage={this.props.currentPage}
                        pageSize={this.props.pageSize}
                        onPageChanged={this.onPageChanged}
                        //followSuccess={this.props.followSuccess}
                        //setTotalCount={this.props.setTotalCount}
                        //unfollowSuccess={this.props.unfollowSuccess}
                        toggleFollowingProgress={this.props.toggleFollowingProgress}
                        followingProgress={this.props.followingProgress}
                        follow={this.props.follow}
                        unFollow={this.props.unFollow}
        />
        </>
    }
}

type mapStatePropsType = {
    users: UsersType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingProgress: Array<string>
    userId: string
}

type mapDispatchPropsType = {
    //followSuccess: (userId: string) => void
   //unfollowSuccess: (userId: string) => void
    //setUsers: (users: UsersType[]) => void
    setCurrentPage: (pageNumber: number) => void
    //setTotalCount: (totalCount: number) => void
    //toggleIsFetching: (isFetching: boolean) => void
    toggleFollowingProgress: (isFetching: boolean, userId: string) => void
    getUsers: (currentPage: number, pageSize: number) => void
    follow: (userId: string) => void
    unFollow: (userId: string) => void
}

export type UsersPropsType = mapStatePropsType & mapDispatchPropsType

const mapStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingProgress: state.usersPage.followingInProgress,
        userId: state.usersPage.userId
    }
}

// const mapDispatchToProps = (dispatch: Dispatch): mapDispatchPropsType => {
//     return {
//         follow: (userId) => {
//             dispatch(follow(userId))
//         },
//         unFollow: (userId) => {
//             dispatch(unfollow(userId))
//         },
//         setUsers: (users) => {
//             dispatch(setUsers(users))
//         },
//         setCurrentPage: (pageNumber) => {
//             dispatch(setCurrentPage(pageNumber))
//         },
//         setTotalCount: (totalCount) => {
//             dispatch(setUsersTotalCount(totalCount))
//         },
//         toggleIsFetching: (isFetching) => {
//             dispatch(toggleIsFetching(isFetching))
//         }
//     }
// }

export default withAuthRedirect(connect(mapStateToProps, {
    follow: follow,
    unFollow: unFollow,
    setCurrentPage,
    toggleFollowingProgress,
    getUsers
})(UsersContainer));