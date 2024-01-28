import React, {ComponentType} from 'react';
import {connect} from "react-redux";
import {
    follow,
    getUsersTC,
    setCurrentPage,
    toggleFollowingProgress,
    unFollow,
    UsersType
} from "../../Redux/users-reducer";
import {AppStateType} from "../../Redux/redux-store";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize, getPortionSize,
    getTotalUsersCount,
    getUserId,
    getUsers
} from "../../Redux/users-selectors";

class UsersContainer extends React.Component<UsersPropsType, UsersType> {


    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.getUsersTC(currentPage, pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props
        this.props.getUsersTC(pageNumber, pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                        users={this.props.users}
                        currentPage={this.props.currentPage}
                        pageSize={this.props.pageSize}
                        onPageChanged={this.onPageChanged}
                        toggleFollowingProgress={this.props.toggleFollowingProgress}
                        followingProgress={this.props.followingProgress}
                        follow={this.props.follow}
                        unFollow={this.props.unFollow}
                        portionSize={this.props.portionSize}
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
    portionSize: number

}

type mapDispatchPropsType = {
    setCurrentPage: (pageNumber: number) => void
    toggleFollowingProgress: (isFetching: boolean, userId: string) => void
    getUsersTC: (currentPage: number, pageSize: number) => void
    follow: (userId: string) => void
    unFollow: (userId: string) => void
}

export type UsersPropsType = mapStatePropsType & mapDispatchPropsType

const mapStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingProgress: getFollowingInProgress(state),
        userId: getUserId(state),
        portionSize: getPortionSize(state)
    }
}

export default compose<ComponentType>(
    connect(mapStateToProps, {
        follow: follow,
        unFollow: unFollow,
        setCurrentPage,
        toggleFollowingProgress,
        getUsersTC
    })
)(UsersContainer)