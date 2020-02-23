import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './Layout/Layout';
import HomePage from '../views/HomePage';
import MoviesPage from '../views/MoviesPage';
import routes from '../routes';
import MovieDetailsPage from '../views/MovieDetailsPage/MovieDetailsPage';

export default class App extends Component {
  state = {};

  render() {

    return (
      <Layout>
        <Switch>
          <Route path={routes.home} exact component={HomePage} />
          <Route path={routes.movies} exact component={MoviesPage} />
          <Route path={routes.movieDetails} component={MovieDetailsPage} />
          <Redirect to={routes.home} />
        </Switch>
      </Layout>
    )
  }
}
