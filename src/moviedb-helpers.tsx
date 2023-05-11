import { parse } from 'date-fns'
import format from 'date-fns/format'
import { Movie } from './services/moviedb-service-types'

const formatDate = (date: string): string => {
    if (!date) return 'Invalid Date'
    const dateParsed = parse(date, 'yyyy-mm-dd', new Date())
    return format(dateParsed, 'MMMM d, yyyy')
}

const truncOverview = (
    overview: string,
    title: number,
    date: number,
    genres: number,
    rate: number
): string => {
    const cardHeight = 269
    const gap = 7
    const lineHeight = 22
    const charsLineWidth = 28

    const calculatedHeight = cardHeight - gap * 4 - title - date - genres - rate
    const numberOfRows = calculatedHeight / lineHeight
    const length = numberOfRows * charsLineWidth

    const truncated = overview.substring(0, length)
    if (overview.length < length) {
        return truncated
    } else {
        return truncated.replace(/\s+\S*$/, '...')
    }
}

const getRatingColor = (rating: number): string => {
    if (rating <= 3) return '#E90000'
    if (rating <= 5) return '#E97E00'
    if (rating <= 7) return '#E9D100'
    if (rating > 7) return '#66E900'
    return ''
}

const getInitialRateValue = (ratedMovies: Movie[], id: number) => {
    let rating = 0
    for (const el of ratedMovies) {
        if (id === el.id && el.rating !== undefined) {
            rating = el.rating
        }
    }
    return rating
}

export { formatDate, truncOverview, getRatingColor, getInitialRateValue }
