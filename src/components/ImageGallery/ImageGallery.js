import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button/Button';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from '../../components/Loader/Loader';

import s from './ImageGallery.module.css';
import Modal from 'components/Modal/Modal';

export default class ImageGallery extends Component {
    render() {
        const {
            contentAvailable,
            image,
            images,
            loading,
            onButtonClick,
            modalToggle,
            modalOpen,
            onImageClick,
        } = this.props;

        const contentLoaded = contentAvailable && !loading;
        const content =
            images &&
            images.map((img, idx) => (
                <ImageGalleryItem
                    onImageClick={onImageClick}
                    key={idx}
                    id={img.id}
                    alt={img.tags}
                    webformatURL={img.webformatURL}
                />
            ));

        return (
            <>
                <section className={s.section}>
                    <ul className={s.gallery}>{content}</ul>
                    {loading && <Loader />}
                    {contentLoaded && <Button onButtonClick={onButtonClick} />}

                    {modalOpen && (
                        <Modal
                            link={image.largeImageURL}
                            alt={image.tags}
                            modalToggle={modalToggle}
                        />
                    )}
                </section>
            </>
        );
    }
}

ImageGallery.propTypes = {
    contentAvailable: PropTypes.bool.isRequired,
    image: PropTypes.shape({
        id: PropTypes.number,
        tags: PropTypes.string,
        largeImageURL: PropTypes.string,
    }).isRequired,
    images: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    modalOpen: PropTypes.bool.isRequired,
    modalToggle: PropTypes.func.isRequired,
    onButtonClick: PropTypes.func.isRequired,
    onImageClick: PropTypes.func.isRequired,
};
