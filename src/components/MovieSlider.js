import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "./MovieSlider.css";

const API_KEY = "fb6a20f9"; // Your OMDB API key
const MOVIE_TITLES = ["Dune: Part Two", "Oppenheimer", "Interstellar"]; // List of movies

const MovieSlider = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const fetchedMovies = await Promise.all(
        MOVIE_TITLES.map(async (title) => {
          const response = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(
              title
            )}`
          );
          const data = await response.json();
          return data;
        })
      );
      setMovies(fetchedMovies);
    };

    fetchMovies();
  }, []);

  return (
    <div className="movie-slider">
      <Swiper
        modules={[Navigation]}
        navigation={{ nextEl: ".right-arrow", prevEl: ".left-arrow" }}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
      >
        {movies.map((movie, idx) => (
          <SwiperSlide key={idx} className="movie-card">
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="movie-poster"
            />
            <h3 className="movie-title">{movie.Title}</h3>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Arrows */}
      <button className="arrow left-arrow">
        <FaChevronLeft />
      </button>
      <button className="arrow right-arrow">
        <FaChevronRight />
      </button>
    </div>
  );
};

export default MovieSlider;
