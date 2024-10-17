import React from 'react';
import classes from './modal.module.css';

const Modal = ({ onClose, pokemonDetails }) => {
  if (!pokemonDetails) return null;

  return (
    <div className={classes.modalBackdrop} onClick={onClose}>
      <div className={classes.modalContent} onClick={(e) => e.stopPropagation()}>
        <span className={classes.closeIcon} onClick={onClose}>
          &times;
        </span>
        <img
          src={pokemonDetails.sprites.other.dream_world.front_default}
          alt={pokemonDetails.name}
          className={classes.pokemonImage}
        />
        <h2 className={classes.pokemonName}>
          {pokemonDetails.name.charAt(0).toUpperCase() + pokemonDetails.name.slice(1)}
        </h2>
        <div className={classes.characteristics}>
          <ul>
            <li><strong>Abilities:</strong> {pokemonDetails.abilities.map(ability => ability.ability.name).join(', ')}</li>
            <li><strong>Stats:</strong> {pokemonDetails.stats.map(stat => stat.stat.name).join(', ')}</li>
            <li><strong>Type:</strong> {pokemonDetails.types.map(type => type.type.name).join(', ')}</li>
            <li><strong>Some Moves:</strong> {pokemonDetails.moves.slice(0, 5).map(move => move.move.name).join(', ')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Modal;
