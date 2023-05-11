import { Tabs } from 'antd'
import { useEffect, useState } from 'react'
import ErrorAlert from '../components/error-alert/error-alert'
import {
    GenresContext,
    GuestIdContext,
    MovieService,
    RatedMovies,
} from '../context'
import RatedBody from '../modules/rated-body/rated-body'
import SearchBody from '../modules/search-body/search-body'
import MovieDBService from '../services/moviedb-service'
import { Genre, Movie } from '../services/moviedb-service-types'
import './App.css'
const moviesDbService = new MovieDBService()

function App() {
    const [genresList, setGenresList] = useState([
        { id: 1, name: '' },
    ] as Genre[])
    const [guestId, setGuestId] = useState('')
    const [savedQuery, setSavedQuery] = useState('')
    const [ratedMovies, setRatedMovies] = useState({
        movies: [] as Movie[],
        pages: 1,
    })
    const [errorBound, setErrorBound] = useState({
        isError: false,
        error: new Error('no error, its ok'),
    })

    useEffect(() => {
        moviesDbService
            .getGenresList()
            .then((list) => setGenresList(list.genres))
        moviesDbService
            .createGuestSession()
            .then((id) => setGuestId(id))
            .catch((e) => {
                setErrorBound({
                    isError: true,
                    error: e,
                })
            })
    }, [])

    const getRatedMovies = (page: number) => {
        moviesDbService
            .getRatedMovies(guestId, page)
            .then(({ movies, pages }) => {
                setRatedMovies({ movies, pages })
            })
    }

    return (
        <div className="app">
            {errorBound.isError ? (
                <ErrorAlert error={errorBound.error}></ErrorAlert>
            ) : (
                <MovieService.Provider value={moviesDbService}>
                    <GenresContext.Provider value={genresList as Genre[]}>
                        <GuestIdContext.Provider value={guestId}>
                            <RatedMovies.Provider value={ratedMovies}>
                                <Tabs
                                    destroyInactiveTabPane
                                    items={[
                                        {
                                            label: 'Search',
                                            key: '1',
                                            children: (
                                                <SearchBody
                                                    saveQuery={setSavedQuery}
                                                    searchQuery={savedQuery}
                                                ></SearchBody>
                                            ),
                                        },
                                        {
                                            label: 'Rated',
                                            key: '2',
                                            children: (
                                                <RatedBody
                                                    ratedMovies={ratedMovies}
                                                    getRatedMovies={
                                                        getRatedMovies
                                                    }
                                                ></RatedBody>
                                            ),
                                        },
                                    ]}
                                ></Tabs>
                            </RatedMovies.Provider>
                        </GuestIdContext.Provider>
                    </GenresContext.Provider>
                </MovieService.Provider>
            )}
        </div>
    )
}

export default App
