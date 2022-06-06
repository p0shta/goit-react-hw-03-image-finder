import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button/Button';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import ServiceApi from '../../services/ServiceApi';
import Loader from '../../components/Loader/Loader';

import s from './ImageGallery.module.css';
import Modal from 'components/Modal/Modal';

export default class ImageGallery extends Component {
    state = {
        page: 1,
        images: [],
        image: null,
        modalOpen: false,
        loading: false,
    };

    componentDidUpdate(prevProps, prevState) {
        const { search } = this.props;
        const { page } = this.state;

        if (prevProps.search !== search) {
            this.setState({ page: 1, loading: true, images: [] });

            ServiceApi(search, page).then(res =>
                this.setState({ images: res.hits, loading: false })
            );
        }

        if (prevState.page < page) {
            this.setState({ loading: true });

            ServiceApi(search, page).then(res =>
                this.setState(prevState => ({
                    images: [...prevState.images, ...res.hits],
                    loading: false,
                }))
            );
        }
    }

    onButtonClick = () => {
        this.setState(prevState => ({
            page: prevState.page + 1,
        }));
    };

    modalToggle = () => {
        this.setState(prevState => ({
            modalOpen: !prevState.modalOpen,
        }));
    };

    onImageClick = id => {
        const image = this.state.images.find(item => item.id === id);
        this.setState({ image });
        this.modalToggle();
    };

    render() {
        const { images, modalOpen, image, loading } = this.state;
        const { search } = this.props;

        const contentLoaded = images.length >= 12 && !loading;
        const content =
            images &&
            images.map((img, idx) => (
                <ImageGalleryItem
                    onImageClick={this.onImageClick}
                    key={idx}
                    id={img.id}
                    alt={img.tags}
                    webformatURL={img.webformatURL}
                />
            ));

        return (
            <>
                {search && (
                    <section className={s.section}>
                        <ul className={s.gallery}>{content}</ul>

                        {loading && <Loader />}

                        {contentLoaded ? <Button onButtonClick={this.onButtonClick} /> : null}

                        {modalOpen && (
                            <Modal
                                link={image.largeImageURL}
                                alt={image.tags}
                                modalToggle={this.modalToggle}
                            />
                        )}
                    </section>
                )}
            </>
        );
    }
}

ImageGallery.propTypes = {
    search: PropTypes.string.isRequired,
};
