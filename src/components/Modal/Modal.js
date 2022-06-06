import React, { Component } from 'react';
import PropTypes from 'prop-types';

import s from './Modal.module.css';

export default class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.onKeyEscape);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeyEscape);
    }

    onKeyEscape = e => {
        if (e.code === 'Escape') {
            this.props.modalToggle();
        }
    };

    onBackdropClick = e => {
        if (e.target === e.currentTarget) {
            this.props.modalToggle();
        }
    };

    render() {
        const { link, alt } = this.props;

        return (
            <div className={s.backdrop} onClick={e => this.onBackdropClick(e)}>
                <div className={s.modal}>
                    <img src={link} alt={alt} />
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    link: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    modalToggle: PropTypes.func.isRequired,
};
