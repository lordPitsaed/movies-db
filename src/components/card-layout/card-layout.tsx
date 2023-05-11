import { Space } from 'antd'
import React, { useContext } from 'react'
import { GuestIdContext, MovieService } from '../../context'
import { Movie } from '../../services/moviedb-service-types'
import MovieCard from '../movie-card/movie-card'
import './card-layout.css'

const CardLayout: React.FC<{ movies: Movie[] }> = ({ movies }) => {
    const moviedbService = useContext(MovieService)
    const guestSessionId = useContext(GuestIdContext)

    const onRateChange = (rating: number, id: number, sessionId: string) => {
        console.log(rating, id, sessionId)
        moviedbService.postMovieRating(rating, id, sessionId).then(console.log)
    }

    return (
        <Space size={[35, 36]} wrap className="card-layout">
            {movies.map((movie) => {
                const {
                    id,
                    genre_ids,
                    title,
                    poster_path,
                    overview,
                    release_date,
                    vote_average,
                } = movie

                return (
                    <MovieCard
                        key={id}
                        id={id}
                        genreIds={genre_ids}
                        title={title}
                        posterPath={poster_path}
                        overview={overview}
                        releaseDate={release_date}
                        rating={vote_average}
                        onRatingChange={(rating) => {
                            onRateChange(rating, id, guestSessionId)
                        }}
                    ></MovieCard>
                )
            })}
        </Space>
    )
}

export default CardLayout
