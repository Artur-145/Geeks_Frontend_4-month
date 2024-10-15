import React, { useEffect, useState } from 'react';
import classes from './pokemoncard.module.css'

const PokemonCard = ({ pokemon }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await fetch(pokemon.url);
      const data = await response.json();
      setDetails(data);
    };

    fetchDetails();
  }, [pokemon]);

  return (
    <div className={classes.pokemonCard}>
      {details && (
        <>
          <img
            src={details.sprites.other.dream_world.front_default}
            alt={details.name}
          />
          <h2>{details.name.charAt(0).toUpperCase() + details.name.slice(1)}</h2>
          <button className={classes.detailsButton}>Подробнее</button>
        </>
      )}
    </div>
  );
};

export default PokemonCard;
