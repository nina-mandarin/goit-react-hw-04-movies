import React, { Component } from 'react';

import moviesApi from '../../services/moviesApi';
import Spinner from '../Spinner';
import ErrorNotification from '../ErrorNotification';

export default class Cast extends Component {
  state = {
    movieCast: [],
    isLoading: false,
    error: null,
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    moviesApi.getMovieCredits(this.props.match.params.movieId)
      .then(data => {
        const movieCast = data.cast;

        return this.setState({
          movieCast: movieCast,
        })
      },
      )
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { movieCast, isLoading, error } = this.state;

    return (
      <div>
        <p>Information about cast</p>
        {isLoading && <Spinner />}
        {error && <ErrorNotification text={error.message} />}

        {movieCast.length > 0 &&
          <ul>
            {movieCast.map(actor => {
              return (
                <li key={actor.id}>
                  <div>
                    {actor.profile_path && <img src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`} alt={actor.name} />}
                    <h4>{actor.name}</h4>
                    <p>{actor.character}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        }
      </div>
    )
  }
};
