import s from './ProfileInfo.module.css'
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input, Textarea} from "../../../components/common/FormsControls/FormsControls";
import {ProfileType} from "../../../Redux/profile-reducer";


type PropsType = {
    profile: ProfileType,
}
const ProfileDataForm = (props:InjectedFormProps<PropsType>) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.profileInformation}>
            <div>
                <button type={'submit'}>Save</button>
            </div>
            <div>Full name: {createField('Full name', 'fullName', [], Input, {})}</div>
            <div>About me: {createField('About me', 'aboutMe', [], Textarea, {})}</div>
            <div>Looking for a job:
                {createField('', 'lookingForAJob', [], Input,{type:'checkbox'})}
            </div>
            {createField('My professional skills', 'lookingForAJobDescription', [], Textarea, {})}
        </form>
    );
};

// @ts-ignore
const ProfileDataFormReduxForm = reduxForm({form:'edit-profile'})(ProfileDataForm)
export default ProfileDataFormReduxForm;



