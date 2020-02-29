import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import routes from '../../routes';

import styles from './LinksList.module.css';

class LinksList extends Component {

  render() {
    const { movies, location } = this.props;

    return (
      <>
        {movies && movies.length > 0 &&
          <ul>
            {movies.map(movie => {
              return (
                <li key={movie.id} className={styles.ListItem}>
                  <NavLink
                    to={{
                      pathname: `${routes.movies}/${movie.id}`,
                      state: { from: location }
                    }}
                  >
                    {movie.title ? movie.title : movie.name}

                  </NavLink>
                </li>
              )
            })}
          </ul>
        }
      </>
    );
  }
};

export default withRouter(LinksList);