import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { NavLink } from 'react-router-dom';

const Favorites: React.FC = () => {
    const { favorites } = useSelector((state: RootState) => state.pokemon);
    console.log(favorites)



    return (
        <div>
            <h1>Favorite Pokemon</h1>
            <ul>
                {favorites.map((pokemon) => (
                    <li key={pokemon.name}>
                        <NavLink to={`/pokemon/${pokemon.name}`}>
                            <img src={pokemon.url} alt={pokemon.name} />
                            {pokemon.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Favorites;
