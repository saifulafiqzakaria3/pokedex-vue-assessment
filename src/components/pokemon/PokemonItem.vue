<template>
  <li>
    <h3>{{ pokemon.name }}</h3>
    <el-checkbox
      v-model="isStarred"
      label="Favorite"
      size="large"
      border
      @change="setFavorite"
    ></el-checkbox>
    <div style="display: flex; justify-content: center">
      <img alt="pokemon" :src="pokemon.previewImageUrl" />
    </div>
    <div>
      <base-badge
        v-for="type in pokemon.types"
        :key="type"
        :type="type.toString().toLowerCase()"
        :title="type"
      ></base-badge>
    </div>
    <div class="actions">
      <base-button link :to="pokemonDetailLink">View Details</base-button>
    </div>
  </li>
</template>

<script>
export default {
  props: ["pokemon"],
  data() {
    return {
      isStarred: this.pokemon.isFavorite,
    };
  },
  computed: {
    pokemonDetailLink() {
      return "/homepage/" + this.pokemon.id;
    },
  },
  methods: {
    setFavorite() {
      const updatedPokemonDetail = {
        id: this.pokemon.id,
        name: this.pokemon.name,
        previewImageUrl: this.pokemon.previewImageUrl,
        types: this.pokemon.types,
        height: this.pokemon.height,
        weight: this.pokemon.weight,
        gender: this.pokemon.gender,
        abilities: this.pokemon.abilities,
        stats: this.pokemon.stats,
        isFavorite: this.isStarred,
      };
      this.$store.dispatch(
        "pokemons/updateFavoritePokemonsList",
        updatedPokemonDetail
      );
    },
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
  list-style: none;
}

h3 {
  font-size: 1.5rem;
  text-transform: capitalize;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: center;
}

img {
  display: block;
  width: 150px;
  height: 150px;
}
</style>
