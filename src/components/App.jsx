import { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import SearchBar from './Searchbar/SearchBar';
import ServiceApi from '../services/ServiceApi';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

export class App extends Component {
    state = {
        search: '',
        page: 1,
        images: [],
        image: {},
        modalOpen: false,
        loading: false,
        contentAvailable: false,
    };

    componentDidUpdate(prevProps, prevState) {
        const { search } = this.state;
        const { page } = this.state;

        if (prevState.search !== search) {
            this.setState({ page: 1, loading: true, images: [] });

            ServiceApi(search, page).then(res =>
                this.setState({
                    images: res.hits,
                    loading: false,
                    contentAvailable: res.hits.length === 12,
                })
            );
        }

        if (prevState.page < page) {
            this.setState({ loading: true });

            ServiceApi(search, page).then(res =>
                this.setState(prevState => ({
                    images: [...prevState.images, ...res.hits],
                    loading: false,
                    contentAvailable: res.hits.length === 12,
                }))
            );
        }
    }

    onSubmit = search => {
        this.setState({ search });
    };

    onButtonClick = () => {
        this.setState(prevState => ({
            page: prevState.page + 1,
        }));
    };

    onImageClick = id => {
        const image = this.state.images.find(item => item.id === id);
        this.setState({ image });
        this.modalToggle();
    };

    modalToggle = () => {
        this.setState(prevState => ({
            modalOpen: !prevState.modalOpen,
        }));
    };

    render() {
        const { image, images, loading, modalOpen, contentAvailable } = this.state;
        const contentLoaded = contentAvailable && !loading;

        return (
            <main>
                <SearchBar onSubmit={this.onSubmit} />
                <ImageGallery images={images} onImageClick={this.onImageClick} />
                {loading && <Loader />}
                {contentLoaded && <Button onButtonClick={this.onButtonClick} />}
                {modalOpen && (
                    <Modal
                        link={image.largeImageURL}
                        alt={image.tags}
                        modalToggle={this.modalToggle}
                    />
                )}
            </main>
        );
    }
}
