import Button from 'components/Button/Button';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import ServiceApi from '../../services/ServiceApi';
import Loader from '../../components/Loader/Loader';
import React, { Component } from 'react';

import s from './ImageGallery.module.css';
import Modal from 'components/Modal/Modal';

export default class ImageGallery extends Component {
    state = {
        page: 1,
        images: null,
        image: null,
        showModal: false,
        loading: null,
    };

    componentDidUpdate(prevProps, prevState) {
        const { search } = this.props;
        const { page } = this.state;

        if (prevProps.search !== search) {
            this.setState({ page: 1, loading: 'loading', images: null });

            ServiceApi(search, page).then(res =>
                this.setState({ images: res.hits, loading: null })
            );
        }

        if (prevState.page < page) {
            this.setState({ loading: 'loading' });

            ServiceApi(search, page).then(res =>
                this.setState(prevState => ({
                    images: [...prevState.images, ...res.hits],
                    loading: null,
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
            showModal: !prevState.showModal,
        }));
    };

    onImageClick = id => {
        const image = this.state.images.find(item => item.id === id);
        this.setState({ image });
        this.modalToggle();
    };

    render() {
        const { images, showModal, image, loading } = this.state;
        const { search } = this.props;

        return (
            <>
                {search && (
                    <section className={s.section}>
                        <ul className={s.gallery}>
                            {images &&
                                images.map((img, idx) => (
                                    <ImageGalleryItem
                                        onImageClick={this.onImageClick}
                                        key={idx}
                                        id={img.id}
                                        alt={img.tag}
                                        webformatURL={img.webformatURL}
                                    />
                                ))}
                        </ul>

                        {loading === 'loading' ? <Loader /> : null}

                        {images && images.length >= 12 && loading !== 'loading' ? (
                            <Button onButtonClick={this.onButtonClick} />
                        ) : null}

                        {showModal && (
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
