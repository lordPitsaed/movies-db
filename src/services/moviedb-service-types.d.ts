export interface Genre {
    id: number
    name: string
}

export interface Movie {
    backdrop_path: string
    genres: number[]
    id: number
    original_title: string
    overview: string
    poster_path: string
    release_date: string
    title: string
    vote_average: number
    vote_count: number
    rating?: number
}

export interface Movie {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
    rating: number
}

export interface MoviesList {
    page: number
    results: Movie[]
    total_pages: number
    total_results: number
}

export interface GenresList {
    genres: Genre[]
}

export interface GuestSession {
    success: boolean
    guest_session_id: string
    expires_at: string
}
