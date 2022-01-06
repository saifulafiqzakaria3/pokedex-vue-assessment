import { createStore } from 'vuex';
import pokemonModule from './modules/pokemons/index.js'

const store = createStore({
    modules: {
        pokemons: pokemonModule 
    }
});

export default store;

