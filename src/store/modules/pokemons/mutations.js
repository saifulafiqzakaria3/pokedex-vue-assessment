export default {
  setPokemons(state, payload) {
    state.pokemonsList = payload;
  },

  setTotalAvailablePokemons(state, payload) {
    state.totalPokemons = payload;
  },

  setFavoritePokemonsByArray(state, payload) {
    state.favoriteList = payload;
  },

  setPokemonTypes(state, payload) {
    state.pokemonTypes = payload;
  },

  setTypeToSearch(state, payload) {
    state.typeToSearch = payload;
  }
};
