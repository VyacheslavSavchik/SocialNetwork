import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from '../../../utils/validators/validators';
import {Textarea} from "../../common/FormsControls/FormsControls";

export type formDataType = {
    dialogAddMessageForm: string
    newMessageBody: string
}

const maxLength50 = maxLengthCreator(50)
const AddMessageForm:React.FC<InjectedFormProps<formDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}
                       validate={[required, maxLength50]}
                       name='newMessageBody'
                       placeholder='Enter your message'/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

export const AddMessageFormRedux = reduxForm<formDataType>({form: 'dialogAddMessageForm'})(AddMessageForm)
