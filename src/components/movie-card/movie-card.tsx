import { Card, Rate } from 'antd'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { RatedMovies } from '../../context'
import {
    formatDate,
    getInitialRateValue,
    getRatingColor,
    truncOverview,
} from '../../moviedb-helpers'
import PosterImage from '../../poster-image/poster-image'
import GenresTags from '../genres-tags/genres-tags'
import './movie-card.css'

const MovieCard: React.FC<{
    id: number
    title: string
    overview: string
    genreIds: number[]
    posterPath: string
    releaseDate: string
    rating: number
    onRatingChange: (rating: number) => void
}> = ({
    id,
    title,
    overview,
    genreIds,
    posterPath,
    releaseDate,
    rating,
    onRatingChange,
}) => {
    const { movies: ratedMovies } = useContext(RatedMovies)

    const titleHeight = useRef<HTMLElement>(null)
    const dateHeight = useRef<HTMLElement>(null)
    const genresHeight = useRef<HTMLDivElement>(null)
    const rateHeight = useRef<HTMLDivElement>(null)

    const [newOverview, setNewOverview] = useState('')
    const [rateValue, setRateValue] = useState(0)

    useEffect(() => {
        setNewOverview(
            truncOverview(
                overview,
                titleHeight.current?.clientHeight as number,
                dateHeight.current?.clientHeight as number,
                genresHeight.current?.clientHeight as number,
                rateHeight.current?.clientHeight as number
            )
        )
        setRateValue(getInitialRateValue(ratedMovies, id) as number)
    }, [])

    return (
        <Card size="small" bordered={false} className="card">
            <div className="movie-card">
                <PosterImage posterPath={posterPath}></PosterImage>
                <div className="movie-info">
                    <div className="card-header">
                        <span className="movie-title" ref={titleHeight}>
                            {title}
                        </span>
                        <span
                            className="rating"
                            style={{ borderColor: getRatingColor(rating) }}
                        >
                            {rating.toFixed(1)}
                        </span>
                    </div>
                    <span className="date-fns" ref={dateHeight}>
                        {formatDate(releaseDate)}
                    </span>
                    <div className="genres-tags" ref={genresHeight}>
                        <GenresTags movieGenres={genreIds}></GenresTags>
                    </div>
                    <div className="overview">{newOverview}</div>
                    <div className="rate" ref={rateHeight}>
                        <Rate
                            defaultValue={5}
                            value={rateValue}
                            allowHalf
                            count={10}
                            className="rate"
                            onChange={(rating) => {
                                setRateValue(rating)
                                onRatingChange(rating)
                            }}
                            allowClear={false}
                        ></Rate>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default MovieCard
