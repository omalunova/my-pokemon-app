export interface Pokemon {
    name: string;
    url: string;
}

export interface PokemonDetail {
    name: string;
    abilities: { ability: { name: string } }[];
    types: { type: { name: string } }[];
    stats: { base_stat: number; stat: { name: string } }[];
    sprites: { front_default: string };
    forms: { name: string }[];
    url: string;
}

export interface PokemonState {
    pokemonList: Pokemon[];
    loading: boolean;
    error: string | null;
    favorites: Pokemon[];
    selectedPokemon: PokemonDetail | null;
    currentPage: number;
    searchResults: Pokemon[];
}
