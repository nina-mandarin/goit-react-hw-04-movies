import React, { Component } from 'react';

import Spinner from '../components/Spinner';
import routes from '../routes';
import ListLinkItem from '../components/ListLinkItem';
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

    return (
      <div>
        <h2>Trending today</h2>
        {isLoading && <Spinner />}
        {error && <ErrorNotification text={error.message} />}

        {movies.length > 0 &&
          <ul>
            {movies.map(movie => {
              return (
                <ListLinkItem
                  key={movie.id}
                  to={{
                    pathname: `${routes.movies}/${movie.id}`,
                    state: { from: routes.home }
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
