import React, { Component } from 'react';

import Spinner from '../components/Spinner';
import LinksListWithRouter from '../components/LinksList';
import ErrorNotification from '../components/ErrorNotification/ErrorNotification';

import moviesApi from '../services/moviesApi';

export default class HomePage extends Component {
  state = {
    movies: [],
    isLoading: false,
    error: null,
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    moviesApi.getTrendingMovies()
      .then(movies => {
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

    return (
      <div>
        <h2>Trending today</h2>
        {isLoading && <Spinner />}
        {error && <ErrorNotification text={error.message} />}

        <LinksListWithRouter movies={movies} />
      </div>
    )
  }
}
