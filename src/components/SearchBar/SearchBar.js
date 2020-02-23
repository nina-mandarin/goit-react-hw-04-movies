import React, { Component } from 'react';

import styles from "./SearchBar.module.css";

export default class SearchBar extends Component {
  state = {
    value: ''
  }

  handleChange = e => {
    this.setState({
      value: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSearch(this.state.value);

    this.setState({
      value: ''
    })
  }

  render() {
    const { value } = this.state;

    return (
      <form className={styles.Form} onSubmit={this.handleSubmit}>
        <input className={styles.Input} type="text" name="movie" value={value} onChange={this.handleChange} placeholder="Enter a movie name" />
        <button className={styles.Button} type="submit">Search</button>
      </form>
    )
  }
}