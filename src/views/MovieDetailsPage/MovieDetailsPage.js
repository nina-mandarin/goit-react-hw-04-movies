import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Spinner from '../../components/Spinner';
import ListLinkItem from '../../components/ListLinkItem';
import Cast from '../../components/Cast/Cast';
import Reviews from '../../components/Reviews/Reviews';
import ErrorNotification from '../../components/ErrorNotification';

import moviesApi from '../../services/moviesApi';
import routes from '../../routes';

import styles from './MovieDetailsPage.module.css';


export default class MovieDetailsPage extends Component {
  state = {
    movieInfo: {},
    isLoading: false,
    error: null,
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    moviesApi.getMovieDetails(this.props.match.params.movieId)
      .then(data => {
        const movieInfo = data;

        return this.setState({
          movieInfo: movieInfo,
        })
      },
      )
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  handleGoBack = () => {
    const { state } = this.props.location;
    if (state && state.from) {
      return this.props.history.push(state.from);
    }

    this.props.history.push(routes.home);
  }

  render() {
    const { isLoading, title, poster_path, vote_average, overview, genres, error } = this.state.movieInfo;
    const { url } = this.props.match;

    return (
      <div>
        <button type="button" onClick={this.handleGoBack} className={styles.BackButton}>Go back</button>
        {isLoading && <Spinner />}
        {error && <ErrorNotification text={error.message} />}

        {this.state.movieInfo &&
          <>
            <div className={styles.ContentWrap}>
              {poster_path ?
                <img src={`https://image.tmdb.org/t/p/w200/${poster_path}`} alt={title} />
                :
                <img src="https://via.placeholder.com/200x300.png" alt={title} />
              }
              <div className={styles.Content}>
                <h3>{title}</h3>
                <p>User score: {vote_average}</p>

                <h4>Overview</h4>
                <p>{overview}</p>

                <div className={styles.Genres}>
                  <h4>Genres</h4>
                  <div>
                    {genres && genres.map(genre => {
                      return (<span key={genre.id}>{genre.name}</span>)
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Additional information */}
            <div>
              <div className={styles.AdditionalInfo}>
                <h4>Additional information</h4>
                <ul className={styles.AdditionalInfoList}>
                  <ListLinkItem
                    to={{
                      pathname: `${url}/cast`,
                      state: { ...this.props.location.state }
                    }}
                    name='Cast'
                  />
                  <ListLinkItem
                    to={{
                      pathname: `${url}/reviews`,
                      state: { ...this.props.location.state }
                    }}
                    name='Reviews'
                  />
                </ul>
              </div>

              {/* Routes for additional information */}
              <Switch>
                <Route path={`${routes.movieDetails}/cast`} exact component={Cast} />
                <Route path={`${routes.movieDetails}/reviews`} exact component={Reviews} />
              </Switch>
            </div>
          </>
        }
      </div>
    )
  }
}
