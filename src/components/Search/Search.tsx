import {FC, useState} from 'react';
import {useDispatch} from "react-redux";
import {clearSearchResults, searchPokemon} from "../../store/pokemonSlice.ts";
import {AppDispatch} from "../../store/store.ts";

const Search: FC = () => {
    const [query, setQuery] = useState('');
    const [searchType, setSearchType] = useState<'name' | 'type' | 'ability'>('name');
    const dispatch:AppDispatch = useDispatch();

    const handleSearch = () => {
        if (query.trim() !== '') {
            dispatch(searchPokemon({query: query.toLowerCase(), type: searchType}))
        } else {
            dispatch(clearSearchResults())
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    }

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchType(event.target.value as 'name' | 'type' | 'ability');
    }
    return (
        <div>
            <select name="" value={searchType} onChange={handleTypeChange} id="">
                <option value="name">Name</option>
                <option value="type">type</option>
                <option value="ability">ability</option>
            </select>
            <input type="text" value={query} onChange={handleInputChange} placeholder={'Search'} name="" id=""/>
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default Search;