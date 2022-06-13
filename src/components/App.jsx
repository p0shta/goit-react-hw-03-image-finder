import { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import SearchBar from './Searchbar/SearchBar';
import ServiceApi from '../services/ServiceApi';

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

        return (
            <main>
                <SearchBar onSubmit={this.onSubmit} />
                <ImageGallery
                    contentAvailable={contentAvailable}
                    image={image}
                    images={images}
                    loading={loading}
                    modalOpen={modalOpen}
                    modalToggle={this.modalToggle}
                    onButtonClick={this.onButtonClick}
                    onImageClick={this.onImageClick}
                />
            </main>
        );
    }
}
