import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import styles from './Spinner.module.css';

const Spinner = () => {
  return (
    <div className={styles.Loader}>
      <Loader
        type="TailSpin"
        color="#AB47BC"
        height={60}
        width={60}
      />
      <span className={styles.LoaderText}>Loading ...</span>
    </div>
  )
}

export default Spinner;