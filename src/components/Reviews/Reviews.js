import React, { Component } from 'react';

import Spinner from '../Spinner';
import ErrorNotification from '../ErrorNotification';
import moviesApi from '../../services/moviesApi';

export default class Reviews extends Component {
  state = {
    movieReviews: [],
    isLoading: false,
    error: null,
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    moviesApi.getMovieReviews(this.props.match.params.movieId)
      .then(data => {
        const movieReviews = data.results;

        return this.setState({
          movieReviews: movieReviews,
        })
      },
      )
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { movieReviews, isLoading, error } = this.state;

    return (
      <div>
        {isLoading && <Spinner />}
        {error && <ErrorNotification text={error.message} />}

        {movieReviews.length > 0 ?
          <ul>
            {movieReviews.map(author => {
              return (
                <li key={author.id}>
                  <div>
                    <h4>Author: {author.author}</h4>
                    <p>{author.content}</p>
                  </div>
                </li>
              )
            })}
          </ul>
          :
          <p>We don't have any reviews for this movie</p>
        }
      </div>
    )
  }
};
