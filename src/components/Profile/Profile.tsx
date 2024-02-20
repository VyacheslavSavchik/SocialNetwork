import React from 'react';
import ProfileInfo from "./Profileinfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostContainers";
import {ProfileType} from "../../Redux/profile-reducer";

type Profile = {
    profile: ProfileType
    status: string
    updateStatus: (status:string)=>void
    isOwner:boolean
    savePhoto:(file: string)=>void
    saveProfile: (profile: ProfileType) => Promise<void>
}

const Profile = (props: Profile) => {
    return (
        <div>
            <ProfileInfo
                profile={props.profile}
                saveProfile={props.saveProfile}
                savePhoto={props.savePhoto}
                isOwner={props.isOwner}
                status={props.status}
                updateStatus={props.updateStatus}
                />
            <MyPostsContainer/>
        </div>
    );
};

export default Profile;