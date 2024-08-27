import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {Pokemon, PokemonDetail, PokemonState} from "./types";

const initialState: PokemonState = {
    pokemonList: [],
    loading: false,
    error: null,
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
    selectedPokemon: null,
    currentPage: 1,
    searchResults: []
};

export const fetchPokemonDetail = createAsyncThunk<PokemonDetail, string>(
    'pokemon/fetchPokemonDetail',
    async (name) => {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        return response.data;
    }
)

export const fetchPokemon = createAsyncThunk<Pokemon[], number>(
    'pokemon/fetchPokemon',
    async (page) => {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(page - 1) * 20}`);
        const pokemonList = response.data.results.map((pokemon: any) => {
            const pokemonId = pokemon.url.split('/').filter(Boolean).pop();
            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
            return {
                name: pokemon.name,
                url: imageUrl
            };
        });
        return pokemonList;
    }
);


export const searchPokemon = createAsyncThunk<Pokemon[], { query: string, type: 'name' | 'type' | 'ability' }>(
    `pokemon/searchPokemon`,
    async ({ query, type }) => {
        let response;
        if (type === 'name') {
            response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query}`);
            return [{
                name: response.data.name,
                url: response.data.sprites.front_default
            }];
        } else if (type === 'type') {
            response = await axios.get(`https://pokeapi.co/api/v2/type/${query}`);
            const pokemonList = await Promise.all(response.data.pokemon.map(async (pokemonObj: any) => {
                const pokemonResponse = await axios.get(pokemonObj.pokemon.url);
                return {
                    name: pokemonResponse.data.name,
                    url: pokemonResponse.data.sprites.front_default
                };
            }));
            return pokemonList;
        } else if (type === 'ability') {
            response = await axios.get(`https://pokeapi.co/api/v2/ability/${query}`);
            const pokemonList = await Promise.all(response.data.pokemon.map(async (pokemonObj: any) => {
                const pokemonResponse = await axios.get(pokemonObj.pokemon.url);
                return {
                    name: pokemonResponse.data.name,
                    url: pokemonResponse.data.sprites.front_default
                };
            }));
            return pokemonList;
        }
        return [];
    }
);




const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<PokemonDetail>) => {
            const favorite: Pokemon = {
                name: action.payload.name,
                url: action.payload.sprites.front_default
            };

            const isFavorite = state.favorites.some((pokemon) => pokemon.name === favorite.name);
            if (!isFavorite) {
                state.favorites = [...state.favorites, favorite];
                localStorage.setItem('favorites', JSON.stringify(state.favorites));
                console.log(state.favorites);
            }
        },
        removeFavorite: (state, action: PayloadAction<Pokemon>) => {
            state.favorites = state.favorites.filter((pokemon) => pokemon.name !== action.payload.name);
            localStorage.setItem('favorites', JSON.stringify(state.favorites));
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        clearSearchResults: (state) => {
            state.searchResults = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPokemon.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPokemon.fulfilled, (state, action: PayloadAction<Pokemon[]>) => {
                state.loading = false;
                state.pokemonList = action.payload;
            })
            .addCase(fetchPokemon.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occurred';
            })
            .addCase(fetchPokemonDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.selectedPokemon = null;
            })
            .addCase(fetchPokemonDetail.fulfilled, (state, action: PayloadAction<PokemonDetail>) => {
                state.loading = false;
                state.selectedPokemon = action.payload;
            })
            .addCase(fetchPokemonDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occurred';
            })
            .addCase(searchPokemon.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchPokemon.fulfilled, (state, action: PayloadAction<Pokemon[]>) => {
                state.loading = false;
                state.searchResults = action.payload;
            })
            .addCase(searchPokemon.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occurred';
            })
    },
});

export const {addFavorite, removeFavorite, setCurrentPage, clearSearchResults} = pokemonSlice.actions;
export default pokemonSlice.reducer;
