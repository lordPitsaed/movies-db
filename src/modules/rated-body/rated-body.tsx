import React, { useEffect, useState } from 'react';
import CardLayout from '../../components/card-layout/card-layout';
import PagesPagination from '../../components/pages-pagination/pages-pagination';
import WarnAlert from '../../components/warn-alert/warn-alert';
import LoadingSpin from '../../loading-spin/loading-spin';
import { Movie } from '../../services/moviedb-service-types';

const RatedBody: React.FC<{
  ratedMovies: { movies: Movie[]; pages: number };
  getRatedMovies: (pages: number) => void;
}> = ({ ratedMovies, getRatedMovies }) => {
  const [movies, setMovies] = useState(ratedMovies);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    getRatedMovies(pages);
    setPages(movies.pages);
  }, []);

  useEffect(() => {
    setMovies(ratedMovies);
  }, [ratedMovies]);

  const onPaginationChange = (page: number) => {
    setLoading(true);
    getRatedMovies(page);
    setLoading(false);
  };

  return (
    <div className='body'>
      {movies.movies.length === 0 && <WarnAlert />}
      {loading ? <LoadingSpin /> : <CardLayout movies={movies.movies} />}
      <PagesPagination pages={pages} onPageChange={onPaginationChange} />
    </div>
  );
};

export default RatedBody;
