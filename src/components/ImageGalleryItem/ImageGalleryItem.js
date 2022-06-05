import React, { Component } from 'react';

import s from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
    render() {
        const { webformatURL, alt, id, onImageClick } = this.props;

        return (
            <li className={s.galleryItem} onClick={() => onImageClick(id)}>
                <img src={webformatURL} alt={alt} className={s.image} />
            </li>
        );
    }
}
