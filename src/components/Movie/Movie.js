import React, { Component } from "react";
import "./Movie.css";
import { API_URL, API_KEY } from "../../config/index";
import Spinner from "../elements/Spinner/Spinner";
import FourColGrid from "../elements/FourColGrid/FourColGrid";
import Navigation from "../elements/Navigation/Navigation";
import MovieInfo from "../elements/MovieInfo/MovieInfo";
import MovieInfoBar from "../elements/MovieInfoBar/MovieInfoBar";
import Actor from "../elements/Actor/Actor";

export default class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
      actors: null,
      directors: [],
      loading: false
    };
    this.fetchMovieData = this.fetchMovieData.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem(`${this.props.match.params.movieId}`)) {
      const state = JSON.parse(
        localStorage.getItem(`${this.props.match.params.movieId}`)
      );
      this.setState({ ...state });
    } else {
      this.setState({ loading: true });

      //fetch movie data then actors
      const endpoint = `${API_URL}movie/${
        this.props.match.params.movieId
      }?api_key=${API_KEY}&language=en-US`;

      this.fetchMovieData(endpoint);
    }
  }

  fetchMovieData(endpoint) {
    fetch(endpoint)
      .then(res => res.json())
      .then(res => {
        if (res.status_code) {
          this.setState({ loading: false });
        } else {
          this.setState({ movie: res }, () => {
            const endpoint_credit = `${API_URL}movie/${
              this.props.match.params.movieId
            }/credits?api_key=${API_KEY}&language=en-US`;

            fetch(endpoint_credit)
              .then(res => res.json())
              .then(res => {
                const directors = res.crew.filter(
                  member => member.job === "Director"
                );
                this.setState(
                  {
                    actors: res.cast,
                    directors,
                    loading: false
                  },
                  () => {
                    localStorage.setItem(
                      `${this.props.match.params.movieId}`,
                      JSON.stringify(this.state)
                    );
                  }
                );
              });
          });
        }
      })
      .catch(error => console.error("Error: ", error));
  }

  render() {
    return (
      <div>
        {this.state.movie ? (
          <div>
            <Navigation movie={this.props.location.movieName} />
            <MovieInfo
              movie={this.state.movie}
              directors={this.state.directors}
            />
            <MovieInfoBar
              time={this.state.movie.runtime}
              budget={this.state.movie.budget}
              revenue={this.state.movie.revenue}
            />
          </div>
        ) : null}

        {this.state.actors ? (
          <div className="rmdb-moviegrid">
            <FourColGrid header={"Actors"}>
              {this.state.actors.map((element, i) => {
                return <Actor key={i} actor={element} />;
              })}
            </FourColGrid>
          </div>
        ) : null}

        {!this.state.actors && !this.state.loading ? (
          <h1>No Movie Found</h1>
        ) : null}

        {this.state.loading ? <Spinner /> : null}
      </div>
    );
  }
}
