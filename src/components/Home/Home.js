import React, { Component } from "react";
import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  POSTER_SIZE,
  BACKDROP_SIZE
} from "../../config/";
import HeroImage from '../elements/HeroImage/HeroImage';

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
        )
      );
  }

  loadMoreItems() {
    let link = "";
    this.setState({ loading: true });

    if (this.state.searchTerm === "") {
      link = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${this
        .state.currentPage + 1}`;
    } else {
      link = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query${
        this.state.searchTerm
      }$page=${this.state.currentPage + 1}`;
    }
    this.fetchItems(link);
  }

  render() {
    return (
      <div className="rmdb-home">
        {this.state.heroImage ? (
          <div>
            <HeroImage
              image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${
                this.state.heroImage.backdrop_path
              }`}
              title={this.state.heroImage.original_title}
              text={this.state.heroImage.overview}
            />
          </div>
        ) : null}
      </div>
    );
  }
}
