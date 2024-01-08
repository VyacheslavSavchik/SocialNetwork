import React from 'react';
import s from './ProfileInfo.module.css'
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileContainerPropsType} from "../ProfileContainer";

const ProfileInfo = (props: ProfileContainerPropsType) => {
    if(!props.profile) {
        return <Preloader/>
        }
    return (
            <div>
                <div>
                    <img src='https://teleprogramma.pro/sites/default/files/nodes/node_19852_1653762796.jpg'/>
                </div>
                <div className={s.descriptionBlock}>
                    {/*<img src={props.profile.photos.large}/>*/}
                    avatar + description
                </div>
            </div>
    );
};

export default ProfileInfo;