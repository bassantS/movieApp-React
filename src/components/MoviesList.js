import React from "react";
import { Row } from "react-bootstrap";
import CardMovie from "./CardMovie";
import PaginationC from "./PaginationC";
const MoviesList = ({ movies, getCurrentPage, pageCount }) => {
  if (!movies || movies.length === 0) {
    return <h2 className="text-center p-5">لا يوجد افلام</h2>;
  }

  return (
    <Row className="mt-3">
      {movies.map((movie) => {
        return <CardMovie key={movie.id} movie={movie} />;
      })}
      {movies.length >= 1 ? (
        <PaginationC getCurrentPage={getCurrentPage} pageCount={pageCount} />
      ) : null}
    </Row>
  );
};

export default MoviesList;
