import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {FC, useEffect} from "react";
import {fetchPokemonDetail} from "../../store/pokemonSlice.ts";

const PokemonFormDetail:FC = () => {
    const {name, formName} = useParams<{ name: string, formName: string }>()
    const dispatch: AppDispatch = useDispatch();
    const {selectedPokemon, loading, error} = useSelector((state: RootState) => state.pokemon);

    useEffect(() => {
        if(name) {
            dispatch(fetchPokemonDetail(name))

        }
    }, [dispatch, name])

    const form = selectedPokemon?.forms.find((form) => form.name === formName);
    return (
        <div>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            <h1>{selectedPokemon?.name} - {form?.name}</h1>
            <img src={selectedPokemon?.sprites.front_default} alt={form?.name}/>
            <p>Form Name: {form?.name}</p>
        </div>
    );
};

export default PokemonFormDetail;