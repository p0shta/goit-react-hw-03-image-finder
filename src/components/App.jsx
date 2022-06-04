import { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import SearchBar from './Searchbar/SearchBar';

export class App extends Component {
    state = {
        search: '',
    };

    onSubmit = search => {
        this.setState({ search });
    };

    render() {
        return (
            <main>
                <SearchBar onSubmit={this.onSubmit} />
                <ImageGallery search={this.state.search} />
            </main>
        );
    }
}
