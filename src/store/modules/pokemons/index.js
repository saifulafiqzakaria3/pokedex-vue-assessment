import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

export default {
  namespaced: true,
  state() {
    return {
      pokemonsList: [
        {
          id: 1,
          name: "Charmander",
          types: ["Fire"],
          previewImageUrl:
            "https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-blue-version/d/d4/Charmander.gif",
        },
        {
          id: 2,
          name: "Bulbasour",
          types: ["Grass"],
          previewImageUrl:
            "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
        },
      ],
      favoriteList: [],
      pokemonTypes: [],
      totalPokemons: 0,
      typeToSearch: "",
    };
  },
  mutations,
  getters,
  actions,
};
