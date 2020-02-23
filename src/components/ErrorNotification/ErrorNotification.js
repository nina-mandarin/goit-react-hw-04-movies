import React from 'react';
import PropTypes from 'prop-types';

import styles from './ErrorNotification.module.css';

const ErrorNotification = ({ text }) => {
  return (
    <div className={styles.ErrorNotification}>
      {text}
    </div>
  )
}

ErrorNotification.propTypes = {
  text: PropTypes.string.isRequired
}

export default ErrorNotification;