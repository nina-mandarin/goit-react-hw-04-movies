import React, { Component } from 'react';

import moviesApi from '../services/moviesApi';
import SearchBar from '../components/SearchBar/SearchBar';
import ListLinkItem from '../components/ListLinkItem';
import Spinner from '../components/Spinner';
import ErrorNotification from '../components/ErrorNotification';
import getQueryParams from '../utils/get-query-params';

export default class MoviesPage extends Component {
  state = {
    movies: [],
    isLoading: false,
    error: null,
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

    return moviesApi.getSearchMovies(searchQuery)
      .then(data => {
        const movies = data.results;

        return this.setState({
          movies: movies,
        })
      },
      )
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { movies, isLoading, error } = this.state;
    const { url } = this.props.match;

    return (
      <div>
        <SearchBar onSearch={this.handleSearch} />
        {isLoading && <Spinner />}
        {error && <ErrorNotification text={error.message} />}

        {movies.length > 0 &&
          <ul>
            {movies.map(movie => {
              return (
                <ListLinkItem
                  key={movie.id}
                  to={{
                    pathname: `${url}/${movie.id}`,
                    state: { from: this.props.location }
                  }}
                  name={movie.title ? movie.title : movie.name}
                />
              )
            })}
          </ul>
        }
      </div>
    )
  }
}
