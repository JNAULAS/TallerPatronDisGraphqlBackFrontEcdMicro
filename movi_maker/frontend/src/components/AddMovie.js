import React, { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';

import { gql, useMutation } from '@apollo/client'

const listAllMovies = gql`
  query {
    listMovies {
      name
      genero
      year
    }
  }
`

const addNewMovie = gql`
  mutation AddNewMovie($name: String!, $genero: String!, $year: String!) {
    addMovie(name: $name, genero: $genero, year: $year) {
      name
      genero
      year
    }
  }
`

const AddMovie = () => {

  const submitMovie = (e) => {
    e.preventDefault()
    newMovieData({
        variables: {
            name: movieName,
            genero: movieGenre,
            year: movieYear
        },
        refetchQueries: [{
            query: listAllMovies
        }]    
    })
}

const [movieName, setMovieName] = useState('')
const [movieGenre, setMovieGenre] = useState('')
const [movieYear, setMovieYear] = useState('')

const [newMovieData, { loading, error}] = useMutation( addNewMovie )

if (loading) return <p>'Submitting your movie...'</p>
if (error) return <p>`Cannot add yur movie!: ${error.message}`</p>

return ( 
    <div className='addMovie' id="addNewMovie">
        <form onSubmit={submitMovie}>
            <input type="text" placeholder='Movie Name' required onChange={(e) => setMovieName(e.target.value)} />
            <input type="text" placeholder='Movie Genre' required onChange={(e) => setMovieGenre(e.target.value)}/>
            <input type="text" placeholder='Movie Year' onChange={(e) => setMovieYear(e.target.value)}/>

            <button>Add Movie</button>
        </form>
        <div className='top'>
            <Link smooth to="#header" className='top-button'>Back to top</Link>
        </div>
    </div>
 );
}
export default AddMovie