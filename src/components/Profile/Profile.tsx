import React from 'react';
import ProfileInfo from "./Profileinfo/Profileinfo";
import MyPostsContainer from "./MyPosts/MyPostContainers";
import {ProfileContainerPropsType} from "./ProfileContainer";


const Profile = (props: ProfileContainerPropsType) => {
    return (
        <div>
            <ProfileInfo
                status={props.status}
                updateStatus={props.updateStatus}
                getStatus={props.getStatus}
                profile={props.profile}
                getUserProfileThunk={props.getUserProfileThunk}
                history={props.history}
                location={props.location}
                match={props.match}
                staticContext={props.staticContext}
                authorisedUserId={props.authorisedUserId}
                isAuth={props.isAuth}/>
            <MyPostsContainer/>
        </div>
    );
};

export default Profile;