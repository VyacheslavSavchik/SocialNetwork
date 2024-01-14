import React from 'react';
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogsPropsType} from "./DialogsContainer";
import {AddMessageFormRedux, formDataType} from "./AddMessageForm/AddMessageForm";

const Dialogs = (props: DialogsPropsType) => {

    let state = props.dialogsPage;

    const addNewMessage = (values: formDataType) => {
        props.sendMessage(values.newMessageBody)
    }

    let dialogsElements = state.dialogs
        .map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>);
    let messagesElements = state.messages
        .map(m => <Message message={m.message} key={m.id} id={m.id}/>)


    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>
                    <AddMessageFormRedux onSubmit={addNewMessage}/>
                </div>
            </div>
        </div>

    );
};

export default Dialogs;
