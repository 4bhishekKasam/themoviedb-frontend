import React, { Component } from "react";
import { API_URL, API_KEY } from "../../config/";

export default class Home extends Component {
  state = {
    movies: [],
    heroImage: null,
    loading: false,
    currentPage: 0,
    totalPages: 0,
    searchTerm: ""
  };

  componentDidMount() {
    this.setState({ loading: true });
    const link = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    this.fetchItems(link);
  }

  fetchItems(link) {
    fetch(link)
      .then(res => res.json())
      .then(result =>
        this.setState(
          {
            movies: [...this.state.movies, ...result.results],
            heroImage: this.state.heroImage || result.results[0],
            loading: false,
            currentPage: result.page,
            totalPages: result.total_pages
          },
          () => console.log(this.state.movies)
          //    () =>console.log('image : '+this.state.heroImage)
        )
      );
  }

  render() {
    return <div />;
  }
}
