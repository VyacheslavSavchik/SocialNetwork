import React from 'react';
import ProfileInfo from "./Profileinfo/Profileinfo";
import MyPostsContainer from "./MyPosts/MyPostContainers";
import {ProfileContainerPropsType} from "./ProfileContainer";
import {ProfileType} from "../../Redux/profile-reducer";

// export type ProfilePropsType = {
//     profile: ProfileType | null
// }

const Profile = (props: ProfileContainerPropsType) => {
    return (
        <div>
            <ProfileInfo
                profile={props.profile}
                getUserProfileThunk={props.getUserProfileThunk}
                history={props.history}
                location={props.location}
                match={props.match}
                staticContext={props.staticContext}/>
            <MyPostsContainer/>
        </div>
    );
};

export default Profile;