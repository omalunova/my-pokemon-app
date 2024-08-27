import {configureStore} from "@reduxjs/toolkit";
import pokemonSlice from "./pokemonSlice.ts";

export const store = configureStore({
    reducer: {
        pokemon: pokemonSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

