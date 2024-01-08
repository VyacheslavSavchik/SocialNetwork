import React from 'react';
import s from './../Dialogs.module.css'
import { MessagesType } from '../../../Redux/dialogs-reducer';



const Message = (props: MessagesType) => {
    return <div className={s.message}>{props.message}</div>
}

export default Message;