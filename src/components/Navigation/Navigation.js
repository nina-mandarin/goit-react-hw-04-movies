import React from 'react';
import { NavLink } from 'react-router-dom';

import routes from '../../routes';

import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <ul className={styles.Navigation}>
      <li className={styles.NavigationItem}>
        <NavLink to={routes.home} exact className={styles.NavLink} activeClassName={styles.ActiveNavLink}>
          Home
        </NavLink>
      </li>
      <li className={styles.NavigationItem}>
        <NavLink to={routes.movies} className={styles.NavLink} activeClassName={styles.ActiveNavLink}>
          Movies
        </NavLink>
      </li>
    </ul>
  )
}

export default Navigation;