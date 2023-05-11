import { createContext } from 'react'
import MovieDBService from './services/moviedb-service'
import { Genre, Movie } from './services/moviedb-service-types'

const GenresContext = createContext<Genre[]>([{ id: 0, name: '' }])

const MovieService = createContext<MovieDBService>(new MovieDBService())

const GuestIdContext = createContext<string>('')

const RatedMovies = createContext<{ movies: Movie[]; pages: number }>({
    movies: [] as Movie[],
    pages: 1,
})

export { GenresContext, MovieService, GuestIdContext, RatedMovies }
