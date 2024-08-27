import {NavLink, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {FC, useEffect} from "react";
import {addFavorite, fetchPokemonDetail} from "../../store/pokemonSlice.ts";

const PokemonDetail: FC = () => {
    const {name} = useParams<{ name: string }>()
    const dispatch: AppDispatch = useDispatch();
    const {selectedPokemon, loading, error} = useSelector((state: RootState) => state.pokemon);

    useEffect(() => {
        if (name) {
            dispatch(fetchPokemonDetail(name))
        }
    }, [dispatch, name])


    const handleAddFavorite = () => {
        if (selectedPokemon) {
            dispatch(addFavorite(selectedPokemon))
            console.log(selectedPokemon.name)
        }
    };

    return (
        <div>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            <h1>{selectedPokemon?.name}</h1>
            <img src={selectedPokemon?.sprites.front_default} alt={selectedPokemon?.name}/>
            <p>Type: {selectedPokemon?.types.map((type) => type.type.name).join(', ')}</p>
            <p>Abilities: {selectedPokemon?.abilities.map((ability) => ability.ability.name).join(', ')}</p>
            <h2>Stats</h2>
            <ul>
                {selectedPokemon?.stats.map((stat) => (
                    <li key={stat.stat.name}>
                        {stat.stat.name}: {stat.base_stat}
                    </li>
                ))}
            </ul>
            <h2>Forms</h2>
            <ul>
                {selectedPokemon?.forms.map((form) => (
                    <li key={form.name}>
                      <NavLink to={`/pokemon/${name}/form/${form.name}`}>{form.name}</NavLink>
                    </li>
                ))}
            </ul>
            <button onClick={handleAddFavorite}>Add fav</button>
        </div>
    );
};

export default PokemonDetail;