import { Space, Tag } from 'antd'
import React, { useContext } from 'react'
import { GenresContext } from '../../context'

const GenresTags: React.FC<{ movieGenres: number[] }> = ({ movieGenres }) => {
    const allGenres = useContext(GenresContext)
    return (
        <Space size={[0, 8]} wrap>
            {movieGenres.map((genre) => {
                const foundGenre = allGenres.find((el) => {
                    return el.id === genre
                })
                return (
                    <Tag key={genre} style={{ borderRadius: 2 }}>
                        {foundGenre?.name}
                    </Tag>
                )
            })}
        </Space>
    )
}

export default GenresTags
