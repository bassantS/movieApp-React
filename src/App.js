import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import NavBar from "./components/NavBar";
import MoviesList from "./components/MoviesList";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";
function App() {
  const [movies, setmovies] = useState([]);
  const [pageCount, setpageCount] = useState(0);
  //get all movies by axios request
  const getAllMovies = async () => {
    const res = await axios.get(
      "https://api.themoviedb.org/3/movie/popular?api_key=7541abba2f3612f4b2f893007e17eec7&language=ar"
    );
    setmovies(res.data.results);
    console.log(res.data.total_pages);
    setpageCount(res.data.total_pages);
  };
  //get current page by axios request to paginate
  const getCurrentPage = async (page) => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=7541abba2f3612f4b2f893007e17eec7&language=ar&page=${page}`
    );
    setmovies(res.data.results);
    console.log(res.data.total_pages);

    setpageCount(res.data.total_pages);
  };
  useEffect(() => {
    getAllMovies();
  }, []);
  // serach movies by axios request
  const search = async (word) => {
    if (word === "") {
      getAllMovies();
    } else {
      const res = await axios.get(
        `http://api.themoviedb.org/3/search/movie?api_key=7541abba2f3612f4b2f893007e17eec7&language=ar&query=${word}`
      );
      setmovies(res.data.results);
      console.log(res.data.total_pages);

      setpageCount(res.data.total_pages);
    }
  };
  return (
    <div className="font color-body">
      <NavBar search={search} />
      <Container>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <MoviesList
                  movies={movies}
                  getCurrentPage={getCurrentPage}
                  pageCount={pageCount}
                />
              }
            />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
