import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Provider} from "react-redux";
import {store} from "./store/store.ts";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home.tsx";
import PokemonDetail from "./components/PokemonDetail/PokemonDetail.tsx";
import PocemonFormDetail from "./components/PocemonFormDetail/PokemonFormDetail.tsx";
import Favorites from "./components/Favorites/Favorites.tsx";

const route = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "",
                element: <Home/>
            },
            {
                path:"pokemon/:name",
                element: <PokemonDetail/>,
            },
            {
                path:"pokemon/:name/form/:formName",
                element: <PocemonFormDetail/>
            },
            {
                path: "favorites",
                element: <Favorites/>
            }
        ],
    }
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={route}/>
        </Provider>
    </StrictMode>,
)
