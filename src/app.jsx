import React from 'react'

import './app.scss'
import styles from './app.module.scss'
import logo from './logo.svg'

export const App = () => (
  <div className={styles.app}>
    <header className={styles.header}>
      <img src={logo} className={styles.logo} alt="React" />

      <h1>Extension Skeleton</h1>

      <p className={styles.credits}>
        Powered by&nbsp;
        <a href="https://reactjs.org/" className={styles.link}>
          React
        </a>
      </p>
    </header>
  </div>
)
