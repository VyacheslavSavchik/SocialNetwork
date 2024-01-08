import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogsPropsType} from "./DialogsContainer";
import {Redirect} from "react-router-dom";

const Dialogs = (props: DialogsPropsType) => {

    let state = props.dialogsPage;

    const onSendMessageCLick = () => {
        props.sendMessage()
    }

    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.target.value;
        props.updateNewMessageBody(body)
    }

    let dialogsElements = state.dialogs
        .map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>);
    let messagesElements = state.messages
        .map(m => <Message message={m.message} key={m.id} id={m.id}/>)
    const newMessageBody = state.newMessageBody

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div><textarea onChange={onNewMessageChange} value={newMessageBody} placeholder={'Enter your message'}></textarea></div>
                    <div><button onClick={onSendMessageCLick}>Send</button></div>
                </div>
            </div>
        </div>

    );
};

export default Dialogs;

/* const newMessageBody = (e: ChangeEvent<HTMLTextAreaElement>) => {
      const text = e.currentTarget.value
      const action = updateNewMessageBodyCreator(text)
      props.dispatch(action)
  }*/