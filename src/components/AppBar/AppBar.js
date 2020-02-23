import React from 'react';

import styles from './AppBar.module.css';

const AppBar = ({ children}) => {
  return (
    <div className={styles.AppBar}>{children}</div>
  )
}

export default AppBar;