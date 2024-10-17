import React, { useEffect, useState, useRef } from 'react';
import PokemonCard from '../components/pokemonCard/PokemonCard';
import Pagination from '../components/pagination/Pagination';
import classes from './pokemon.module.css';

const Pokemon = () => {
  const pokemonsRef = useRef([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); 
  const pokemonsPerPage = 12;

  useEffect(() => {
    const fetchAllPokemons = async () => {
      const allPokemons = [];
      let offset = 0;

      while (true) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);
        const data = await response.json();
        if (data.results.length === 0) break;
        allPokemons.push(...data.results);
        offset += 20;
      }

      pokemonsRef.current = allPokemons; 
      setTotalPages(Math.ceil(allPokemons.length / pokemonsPerPage)); 
    };

    fetchAllPokemons();
  }, []);

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = pokemonsRef.current.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
      <div>
        <h1 style={{ textAlign: 'center', padding: '15px' }}>Pokemon</h1>
        <hr style={{ width: '74%', borderColor: 'white', margin: '10px auto' }} />
      </div>
      <div className={classes.pokemonContainer}>
        <div className={classes.pokemonList}>
          {currentPokemons.map((pokemon) => (
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
