import React from 'react';
import Profile from "./Profile";
import {getUserProfileThunk, ProfileType} from "../../Redux/profile-reducer";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

type PathParamsType = {
    userId: string
}

export type MapStatePropsType = {
    profile: ProfileType

}

type MapDispatchPropsType = {
    getUserProfileThunk: (userId: string) => void
}

export type MapAndDispatchPostsType = MapStatePropsType & MapDispatchPropsType

export type ProfileContainerPropsType = RouteComponentProps<PathParamsType> & MapAndDispatchPostsType

class ProfileContainer extends React.Component<ProfileContainerPropsType, AppStateType>{

    componentDidMount() {
        let userId = this.props.match.params.userId
        if(!userId) {
            userId = '2';
        }
        this.props.getUserProfileThunk(userId)
    }

    render() {
        return (
           <Profile {...this.props} profile={this.props.profile}/>
        );
    }
}

let AuthRedirectComponent = withAuthRedirect(ProfileContainer)


const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
})

const WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)

export default connect(mapStateToProps, {getUserProfileThunk}) (WithUrlDataContainerComponent);