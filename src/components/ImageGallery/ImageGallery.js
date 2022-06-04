import Button from 'components/Button/Button';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import ServiceApi from '../../services/ServiceApi';
import React, { Component } from 'react';

import s from './ImageGallery.module.css';

export default class ImageGallery extends Component {
    state = {
        page: 1,
        images: null,
    };

    componentDidUpdate(prevProps, prevState) {
        const { search } = this.props;
        const { page } = this.state;

        if (prevProps.search !== search) {
            this.setState({ page: 1 });
            ServiceApi(search, page).then(res => this.setState({ images: res.hits }));
        }

        if (prevState.page < page) {
            ServiceApi(search, page).then(res =>
                this.setState(prevState => ({
                    images: [...prevState.images, ...res.hits],
                }))
            );
        }
    }

    onClick = () => {
        this.setState(prevState => ({
            page: prevState.page + 1,
        }));
    };

    render() {
        const { images } = this.state;

        return (
            <>
                <ul className={s.gallery}>
                    {images &&
                        images.map((img, idx) => (
                            <ImageGalleryItem
                                key={idx}
                                id={img.id}
                                alt={img.tag}
                                webformatURL={img.webformatURL}
                            />
                        ))}
                </ul>

                {images && images.length >= 9 ? <Button onClick={this.onClick} /> : null}
            </>
        );
    }
}
