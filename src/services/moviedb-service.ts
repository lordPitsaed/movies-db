import {
    GenresList,
    GuestSession,
    Movie,
    MoviesList,
} from './moviedb-service-types'

export default class MovieDBService {
    _API_KEY = 'cbf3955afd44b5ac556f2c3fc9e6c4b1'
    _apiBaseUrl = `https://api.themoviedb.org/3`
    async getResource(url: string) {
        const res = await fetch(url)
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`)
        }
        const body = (await res.json()) as
            | Movie
            | MoviesList
            | GenresList
            | GuestSession
        return body
    }

    async postResource(url: string, body: object) {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(body),
        })
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`)
        }
        const response = await res.json()
        return response
    }

    async getMovie(id: number) {
        return (await this.getResource(
            `${this._apiBaseUrl}/movie/${id}?api_key=${this._API_KEY}`
        )) as Movie
    }

    async searchMovie(query: string) {
        const movie = (await this.getResource(
            `${this._apiBaseUrl}/search/movie?api_key=${this._API_KEY}&query=${query}`
        )) as MoviesList
        return { movies: movie.results, pages: movie.total_pages }
    }

    async getMoviesByPageNumber(page: number, query: string) {
        const movies = (await this.getResource(
            `${this._apiBaseUrl}/search/movie?api_key=${this._API_KEY}&query=${query}&page=${page}`
        )) as MoviesList
        return { movies: movies.results, pages: movies.total_pages }
    }

    async getGenresList() {
        return (await this.getResource(
            `${this._apiBaseUrl}/genre/movie/list?api_key=${this._API_KEY}`
        )) as GenresList
    }

    async createGuestSession() {
        const session = (await this.getResource(
            `${this._apiBaseUrl}/authentication/guest_session/new?api_key=${this._API_KEY}`
        )) as GuestSession
        return session.guest_session_id
    }

    async getRatedMovies(sessionId: string, page: number) {
        const movie = (await this.getResource(
            `${this._apiBaseUrl}/guest_session/${sessionId}/rated/movies?api_key=${this._API_KEY}&page=${page}`
        )) as MoviesList
        return { movies: movie.results, pages: movie.total_pages }
    }

    postMovieRating(rating: number, id: number, sessionId: string) {
        return this.postResource(
            `${this._apiBaseUrl}/movie/${id}/rating?api_key=${this._API_KEY}&guest_session_id=${sessionId}`,
            { value: rating }
        )
    }
}
