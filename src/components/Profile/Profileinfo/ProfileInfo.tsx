import React, {useState} from 'react';
import s from './ProfileInfo.module.css'
import {Preloader} from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks"
import userPhoto from "../../../assets/images/image.png";
import {ProfileType} from "../../../Redux/profile-reducer"


type ProfileInfo = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: string) => void
    saveProfile: (profile: ProfileType) => Promise<void>
}

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}: ProfileInfo) => {

    const [editMode, setEditMode] = useState(false)
    
    if(!profile) {
        return <Preloader/>
        }

    const onMainPhotoSelected = (e: any) => {
        if(e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: any) => {
      saveProfile(formData)
          .then(() => {
          setEditMode(false)

      })
    }

    return (
            <div>
                <div className={s.descriptionBlock}>
                    <img src={profile.photos.large || userPhoto} className={s.mainPhoto}/>
                    {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}

                    {editMode
                        && <ProfileData goToEditMode={() => setEditMode(true)} profile={profile} isOwner={isOwner}/>}

                    <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                </div>
            </div>
    );
};

export type ProfileData = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}
const ProfileData = ({profile, isOwner, goToEditMode}: ProfileData) => {
   return <div>
       {isOwner && <div><button onClick={goToEditMode}>Edit</button></div>}
        <div><b>Full name</b>: {profile.fullName}</div>
        <div><b>Looking for a job</b>: {profile.lookingForAJob ? 'yes' : 'no'}</div>
        {profile.lookingForAJob &&
            <div><b>My professional skills</b>{profile.lookingForAJob}</div>}
        <div><b>About me</b>: {profile.aboutMe}</div>
        <div><b>Contacts</b>: {Object.entries(profile.contacts).map(([title, link]) => {
            return <Contact key={title} contactTitle={title} contactValue={link || ''}/>
        })}</div>
    </div>
}


type Contacts = {
    contactTitle: string
    contactValue: string
}

export const Contact = ({contactTitle, contactValue}: Contacts) => {
    return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;