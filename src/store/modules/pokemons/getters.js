//Need getter because it is not advisible to access the store directly,
//thus, we used getter to get something from the store
export default {
    pokemonsList(state) {
        return state.pokemonsList;
    },
    hasPokemons(state) {
        return state.pokemonsList && state.pokemonsList.length > 0;
    },
    getAllPokemonsTotal(state) {
        return state.totalPokemons;
    },
    getFavoritePokemonsList(state) {
        return state.favoriteList;
    },
    hasFavoritePokemons(state) {
        return state.favoriteList && state.favoriteList.length > 0;
    },
    getPokemonTypes(state) {
        return state.pokemonTypes;
    },
    getCurrentTypeToSearch(state) {
        return state.typeToSearch;
    },
};