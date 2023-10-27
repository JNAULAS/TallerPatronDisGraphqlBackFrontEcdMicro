import { gql, useQuery } from '@apollo/client';
import React from 'react';
import SingleMovie from '../components/SingleMovie';

const listAllMovies = gql`
    query {
        listMovies {
            name
            genero
            year
        }
    }
`

const Movies = () => {
    const { loading, error, data } = useQuery( listAllMovies )

    if (loading) return <p className='loading'>We are loading your movies</p>
    if (error) return <p className='error'>Cannot fetch your movies : {error.message}</p>

    return ( 
        <div className='movies'>
            {data.listMovies.map((movie, index) => {
                return <SingleMovie
                    key={index}
                    movieName={movie.name}
                    movieGenre={movie.genero}
                    movieYear={movie.year}
                />
            })}
        </div>
     );
}
 
export default Movies;