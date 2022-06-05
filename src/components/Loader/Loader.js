import React, { Component } from 'react';
import s from './Loader.module.css';

export default class Loader extends Component {
    render() {
        return <div className={s.loader}>LOADING...</div>;
    }
}
