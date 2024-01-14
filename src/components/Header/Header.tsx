import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import {PropsType} from "./HeaderContainer";

const Header = (props: PropsType) => {
    return (
            <header className={s.header}>
                <img
                    src='https://icdn.lenta.ru/images/2021/12/13/00/20211213002603327/square_320_6df6f5217f0f0b3e856b6a0276c1d270.jpg'/>
            <div className={s.loginBlock}>
                {props.isAuth ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
                    : <NavLink to={'/login'}>Login</NavLink>
                }
            </div>
            </header>
    );
};

export default Header;