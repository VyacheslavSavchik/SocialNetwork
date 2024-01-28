import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from './Redux/redux-store';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import SamuraiTSApp from "./App"



ReactDOM.render(
    <SamuraiTSApp />,
        document.getElementById('root'));



