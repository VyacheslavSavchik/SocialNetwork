import React from 'react';
import s from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";
import { DialogsType } from '../../../Redux/dialogs-reducer';



const DialogItem = (props: DialogsType) => {
    let path = '/dialogs/' + props.id
    return (
        <div>
        <div className={s.dialog + ' ' + s.active}>
            <img className={s.img} src='https://storage.yandexcloud.net/stage01-metronews-transfer/media/20220618/13/20/858x540_60e21547_dvindb8d.jpg'/>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
            </div>
    )
}

export default DialogItem;


/*
<img className={s.img} src='https://www.sb.by/upload/iblock/05e/c43ymnipx6pipu7jizluazupuuifo09u.jpg'/>
<img className={s.img} src='https://storage-api.petstory.ru/resize/1000x1000x80/cb/48/7f/cb487f4677a640329e92ac0076004607.jpeg'/>
<img className={s.img} src='https://svetlo.media/upload//upload/news/769904666554.jpeg'/>
<img className={s.img} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxs7zSqnMDIqg4J9zi1er-WBnYX82aQ1x6ew&usqp=CAU'/>*/
