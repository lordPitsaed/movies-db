import debounce from 'lodash.debounce';
import React, { useContext, useEffect, useState } from 'react';
import CardLayout from '../../components/card-layout/card-layout';
import PagesPagination from '../../components/pages-pagination/pages-pagination';
import SearchInput from '../../components/search-input/search-input';
import WarnAlert from '../../components/warn-alert/warn-alert';
import { MovieService } from '../../context';
import LoadingSpin from '../../loading-spin/loading-spin';
import { Movie } from '../../services/moviedb-service-types';

const SearchBody: React.FC<{
  saveQuery: (query: string) => void;
  searchQuery: string;
}> = ({ saveQuery, searchQuery }) => {
  const [movies, setMovies] = useState([] as Movie[]);
  const [loading, setLoading] = useState(true);
  const [nothingFound, setNothingFound] = useState(false);
  const [pages, setPages] = useState(1);
  const [query, setQuery] = useState(searchQuery);

  const movieService = useContext(MovieService);
  const showSearchResults = debounce((query: string) => {
    setNothingFound(false);
    movieService.searchMovie(query).then(({ movies, pages }) => {
      setPages(pages);
      movies.length === 0 && setNothingFound(true);
      setLoading(false);
      setMovies(movies);
    });
  }, 300);

  useEffect(() => {
    showSearchResults(query);
    return () => {
      saveQuery(query);
    };
  }, [query]);

  const onPaginationChange = (page: number) => {
    setLoading(true);
    movieService
      .getMoviesByPageNumber(page, query)
      .then(({ movies, pages }) => {
        setPages(pages);
        movies.length === 0 && setNothingFound(true);
        setLoading(false);
        setMovies(movies);
      });
  };

  return (
    <div className='body'>
      <SearchInput
        initValue={query}
        onSearch={(query) => {
          setLoading(true);
          setQuery(query);
          showSearchResults(query);
        }}
      />
      {nothingFound && <WarnAlert />}
      {loading ? <LoadingSpin /> : <CardLayout movies={movies} />}
      <PagesPagination pages={pages} onPageChange={onPaginationChange} />
    </div>
  );
};

export default SearchBody;
