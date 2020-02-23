import React from 'react';

import styles from './Layout.module.css';
import AppBar from '../AppBar/AppBar';
import Navigation from '../Navigation/Navigation';

const Layout = ({ children }) => {
  return (
    <div className={styles.Layout}>
      <AppBar>
        <Navigation />
      </AppBar>
      <div className={styles.Content}>
        {children}
      </div>
    </div>
  )
}

export default Layout;