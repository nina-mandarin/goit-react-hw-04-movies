import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './ListLinkItem.module.css';

const ListLinkItem = ({ to, name }) => {
  return (
    <li className={styles.ListItem}>
      <NavLink to={to} className={styles.Link}>
        {name}
      </NavLink>
    </li>
  )
}

ListLinkItem.propTypes = {
  to: PropTypes.shape({}).isRequired,
  name: PropTypes.string.isRequired
}

export default ListLinkItem;