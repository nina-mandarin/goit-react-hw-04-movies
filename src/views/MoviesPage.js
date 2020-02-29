import React, { Component } from 'react';

import moviesApi from '../services/moviesApi';
import SearchBar from '../components/SearchBar/SearchBar';
import Spinner from '../components/Spinner';
import ErrorNotification from '../components/ErrorNotification';
import getQueryParams from '../utils/get-query-params';
import LinksListWithRouter from '../components/LinksList';

export default class MoviesPage extends Component {
  state = {
    movies: [],
    isLoading: false,
    error: null,
    isNotFound: false
  };

  componentDidMount() {
    const { query } = getQueryParams(this.props.location.search);

    if (query) {
      this.renderMovies(query);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery } = getQueryParams(prevProps.location.search);
    const { query: nextQuery } = getQueryParams(this.props.location.search);

    if (prevQuery !== nextQuery) {
      this.renderMovies(nextQuery);
    }
  }

  handleSearch = query => {
    this.props.history.push({
      ...this.props.location,
      search: `query=${query}`,
    });
  }

  renderMovies = searchQuery => {
    this.setState({ isLoading: true });
    if (this.state.isNotFound) {
      this.setState({ isNotFound: false });
    }

    return moviesApi.getSearchMovies(searchQuery)
      .then(movies => {
        if (movies.length < 1) {
          this.setState({ isNotFound: true });
        }

        return this.setState({
          movies: movies,
        })
      },
      )
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { movies, isLoading, error, isNotFound } = this.state;

    return (
      <div>
        <SearchBar onSearch={this.handleSearch} />
        {isLoading && <Spinner />}
        {error && <ErrorNotification text={error.message} />}

        {isNotFound && <p>Movie is not found</p>}

        <LinksListWithRouter movies={movies} />
      </div>
    )
  }
}
