import React, { useEffect, useState } from 'react';
import PokemonCard from '../components/pokemonCard/PokemonCard';
import Pagination from '../components/pagination/Pagination';
import classes from './pokemon.module.css';

const Pokemon = () => {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPokemons, setTotalPokemons] = useState(0); 
  const pokemonsPerPage = 12;

  useEffect(() => {
    const fetchPokemons = async () => {
      const offset = (currentPage - 1) * pokemonsPerPage;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${pokemonsPerPage}`);
      const data = await response.json();
      setPokemons(data.results);

      if (totalPokemons === 0) {
        const totalResponse = await fetch('https://pokeapi.co/api/v2/pokemon/');
        const totalData = await totalResponse.json();
        setTotalPokemons(totalData.count);
      }
    };

    fetchPokemons();
  }, [currentPage, totalPokemons]);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= Math.ceil(totalPokemons / pokemonsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  const totalPages = Math.ceil(totalPokemons / pokemonsPerPage);

  return (
    <>
      <div>
        <h1 style={{ textAlign: 'center', padding: '15px' }}>Pokemon</h1>
        <hr style={{ width: '74%', borderColor: 'white', margin: '10px auto' }} />
      </div>
      <div className={classes.pokemonContainer}>
        <div className={classes.pokemonList}>
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
        <Pagination 
          totalPages={totalPages} 
          currentPage={currentPage} 
          paginate={paginate} 
        />
      </div>
    </>
  );
};

export default Pokemon;
