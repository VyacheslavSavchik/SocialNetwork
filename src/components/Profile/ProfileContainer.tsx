import React from 'react';
import Profile from "./Profile";
import {
    getStatus,
    getUserProfileThunk,
    ProfileType,
    savePhoto,
    saveProfile,
    updateStatus
} from "../../Redux/profile-reducer";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

type PathParamsType = {
    userId: string
}

export type MapStatePropsType = {
    profile: ProfileType
    status: string
    authorisedUserId: string
    isAuth: boolean
    isOwner: boolean
}

type MapDispatchPropsType = {
    getUserProfileThunk: (userId: string) => void
    getStatus: (userId: string) => void
    updateStatus: (status: string) => void
    savePhoto: (file: string) => void
    saveProfile: (profile: ProfileType) => Promise<void>
}

export type MapAndDispatchPostsType = MapStatePropsType & MapDispatchPropsType

export type ProfileContainerPropsType = RouteComponentProps<PathParamsType> & MapAndDispatchPostsType

class ProfileContainer extends React.Component<ProfileContainerPropsType, AppStateType> {

    refreshProfile() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorisedUserId;
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfileThunk(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<ProfileContainerPropsType>) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <Profile {...this.props}
                     saveProfile={this.props.saveProfile}
                     savePhoto={this.props.savePhoto}
                     isOwner={!this.props.match.params.userId}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}/>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorisedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
    isOwner: state.profilePage.isOwner
})
export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfileThunk, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)






