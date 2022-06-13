import React, { Component } from 'react';
import PropTypes from 'prop-types';

import s from './SearchBar.module.css';

export default class SearchBar extends Component {
    state = {
        search: '',
    };

    onChange = e => {
        this.setState({
            search: e.target.value,
        });
    };

    onSubmit = e => {
        e.preventDefault();

        if (this.state.search.trim() === '') {
            return;
        }

        this.props.onSubmit(this.state.search);
    };

    render() {
        return (
            <>
                <header className={s.searchbar}>
                    <form className={s.form} onSubmit={this.onSubmit}>
                        <button type="submit" className={s.button}>
                            Search
                        </button>

                        <input
                            className={s.input}
                            value={this.state.search}
                            onChange={this.onChange}
                            type="text"
                            autoComplete="off"
                            autoFocus
                            placeholder="Search images and photos"
                        />
                    </form>
                </header>
            </>
        );
    }
}

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
