import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { fetchPokemon, setCurrentPage } from '../../store/pokemonSlice';
import { Pokemon } from '../../store/types';
import { NavLink } from "react-router-dom";
import Search from "../Search/Search.tsx";

const PokemonList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { pokemonList, loading, error, currentPage, searchResults } = useSelector((state: RootState) => state.pokemon);

    useEffect(() => {
        dispatch(fetchPokemon(currentPage));
    }, [dispatch, currentPage]);

    const handleNextPage = () => {
        dispatch(setCurrentPage(currentPage + 1));
        dispatch(fetchPokemon(currentPage + 1));
    };

    const handlePrevPage = () => {
        dispatch(setCurrentPage(currentPage - 1));
        dispatch(fetchPokemon(currentPage - 1));
    };

    const displayList = searchResults.length > 0 ? searchResults : pokemonList;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <Search />
            <h1>Pokemon List</h1>
            <ul>
                {displayList.map((pokemon: Pokemon, index: number) => (
                    <li key={`${pokemon.name}-${index}`}>
                        <NavLink to={`/pokemon/${pokemon.name}`}>
                            <img src={pokemon.url} alt={pokemon.name} />
                            {pokemon.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
            <div>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Prev</button>
                <span>Page {currentPage}</span>
                <button onClick={handleNextPage}>Next</button>
            </div>
        </div>
    );
}

export default PokemonList;
