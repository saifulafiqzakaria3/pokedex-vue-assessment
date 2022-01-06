// --- Listing Screen ---
// ID, picture, name, types (e.g. Fire, Water)

// --- Details Screen ---
// Pokemon ID, name, picture, description, types, height, weight, gender, category
// weaknesses [Bonus], abilities, Basic stats (HP, Attack, Defense, Speed, etc), Evolution chain [Bonus]

export default {
  async loadPokemonsList(context, offset) {
    context.commit("setTypeToSearch", "");
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=15&offset=` + offset
    );

    const responseData = await response.json();
    context.commit("setTotalAvailablePokemons", responseData.count);
    const pokemons = [];
    for (const pokemon of responseData.results) {
      const detailsResp = await fetch(pokemon.url);
      const details = await detailsResp.json();

      let possibleGender = "male";
      if (details.sprites.front_female) {
        possibleGender = "male/female";
      }

      const pokemonDetails = {
        id: details.id,
        name: details.name,
        previewImageUrl: details.sprites.front_default,
        types: details.types.map((type) => type.type.name),
        height: details.height,
        weight: details.weight,
        gender: possibleGender,
        abilities: details.abilities,
        stats: details.stats,
        isFavorite: context.state.favoriteList.some(
          (pokemon) => pokemon.id === details.id
        ),
      };

      pokemons.push(pokemonDetails);
    }
    context.commit("setPokemons", pokemons);
  },

  async loadPokemonDetailBasedOnID(context, id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/` + id);
    const responseData = await response.json();

    let possibleGender = "male";
    if (responseData.sprites.front_female) {
      possibleGender = "male/female";
    }

    return {
      id: responseData.id,
      name: responseData.name,
      previewImageUrl: responseData.sprites.front_default,
      types: responseData.types.map((type) => type.type.name),
      height: responseData.height,
      weight: responseData.weight,
      gender: possibleGender,
      abilities: responseData.abilities,
      stats: responseData.stats,
      isFavorite: context.state.favoriteList.some(
        (pokemon) => pokemon.id === responseData.id
      ),
    };
  },

  async fetchPokemonTypes(context) {
    const response = await fetch(`https://pokeapi.co/api/v2/type/`);
    const responseData = await response.json();
    const alltypes = responseData.results.map((type) => type.name);
    context.commit("setPokemonTypes", alltypes);

  },

  async searchPokemonByTypes(context, data) {
    context.commit("setTypeToSearch", data.type);
    const response = await fetch(`https://pokeapi.co/api/v2/type/` +data.type);
    const responseData = await response.json();
    context.commit("setTotalAvailablePokemons", responseData.pokemon.length);

    const pokemonsByType = [];
    const slicedPokemonData = responseData.pokemon.slice(data.offset, data.offset + 15)
    for (const data of slicedPokemonData) {
      const detailsResp = await fetch(data.pokemon.url);
      const details = await detailsResp.json();

      let possibleGender = "male";
      if (details.sprites.front_female) {
        possibleGender = "male/female";
      }

      const pokemonDetails = {
        id: details.id,
        name: details.name,
        previewImageUrl: details.sprites.front_default,
        types: details.types.map((type) => type.type.name),
        height: details.height,
        weight: details.weight,
        gender: possibleGender,
        abilities: details.abilities,
        stats: details.stats,
        isFavorite: context.state.favoriteList.some(
          (pokemon) => pokemon.id === details.id
        ),
      };

      pokemonsByType.push(pokemonDetails);
    }
    context.commit("setPokemons", pokemonsByType);
  },

  async searchPokemon(context, searchKey) {
    context.commit("setTypeToSearch", "");
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/` + searchKey
    );
    const responseData = await response.json();

    let possibleGender = "male";
    if (responseData.sprites.front_female) {
      possibleGender = "male/female";
    }

    const searchedPokemon = {
      id: responseData.id,
      name: responseData.name,
      previewImageUrl: responseData.sprites.front_default,
      types: responseData.types.map((type) => type.type.name),
      height: responseData.height,
      weight: responseData.weight,
      gender: possibleGender,
      abilities: responseData.abilities,
      stats: responseData.stats,
      isFavorite: context.state.favoriteList.some(
        (pokemon) => pokemon.id === responseData.id
      ),
    };

    context.commit("setPokemons", [searchedPokemon]);
    context.commit("setTotalAvailablePokemons", 1);

  },

  updateFavoritePokemonsList(context, pokemonData) {
    let tempFavoriteList = context.state.favoriteList;
    if (pokemonData.isFavorite) {
      //add pokemon in the favorite list
      tempFavoriteList.push(pokemonData);
    } else {
      //remove pokemon from list
      tempFavoriteList = tempFavoriteList.filter(
        (pokemon) => pokemon.id !== pokemonData.id
      );
    }
    context.commit("setFavoritePokemonsByArray", tempFavoriteList);
  },

  updateFavoriteListInDB(context) {
    fetch(`https://vue-assessment-pokedex-7e471-default-rtdb.asia-southeast1.firebasedatabase.app/favoritepokemons.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(context.state.favoriteList)
    });
  },
  async fetchFavoriteListFromDB(context) {
    const response = await fetch(`https://vue-assessment-pokedex-7e471-default-rtdb.asia-southeast1.firebasedatabase.app/favoritepokemons.json`);
    const responseData = await response.json();
    context.commit("setFavoritePokemonsByArray", responseData);
  },

  sortPokemonList(context, data) {
    if (!data.isSortingFavoriteList) {
      let sortedPokemonList = context.state.pokemonsList;
      if (data.sortBy === "ascending") {
        sortedPokemonList.sort((a, b) => {
          return a.id - b.id;
        });
      } else {
        sortedPokemonList.sort((a, b) => {
          return b.id - a.id;
        });
      }
      context.commit("setPokemons", sortedPokemonList);
    } else {
      let sortedFavoriteList = context.state.favoriteList;
      if (data.sortBy === "ascending") {
        sortedFavoriteList.sort((a, b) => {
          return a.id - b.id;
        });
      } else {
        sortedFavoriteList.sort((a, b) => {
          return b.id - a.id;
        });
      }
      context.commit("setFavoritePokemonsByArray", sortedFavoriteList);
    }
  },
};
