import React, { useState } from 'react'
import LoadingSpin from '../loading-spin/loading-spin'
import noImage from './no-image.jpg'
import './poster-image.css'

const PosterImage: React.FC<{ posterPath: string }> = ({ posterPath }) => {
    const verifyPosterUrl = (url: string): string => {
        if (!url) {
            return noImage
        }
        return `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${url}`
    }
    const [loading, setLoading] = useState(true)
    return (
        <React.Fragment>
            <div
                className="poster-loading"
                style={loading ? {} : { display: 'none' }}
            >
                <LoadingSpin></LoadingSpin>
            </div>
            <img
                src={verifyPosterUrl(posterPath)}
                alt="movie poster"
                className="movie-poster"
                onLoad={() => setLoading(false)}
            ></img>
        </React.Fragment>
    )
}

export default PosterImage
