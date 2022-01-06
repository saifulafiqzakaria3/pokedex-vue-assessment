<template>
  <section>
    <base-card style="max-width: 80%; text-align: center">
      <div style="display: flex; justify-content: left; margin-bottom: 5px;">
        <label for="SortBy"> Sort Pokemon By: </label>
      </div>

      <div style="display: flex; justify-content: left">
        <el-select
          v-model="sortBy"
          class="m-2"
          placeholder="Sort By"
          size="large"
          @change="sortList"
        >
          <el-option label="Ascending ID" value="ascending"> </el-option>
          <el-option label="Descending ID" value="descending"> </el-option>
        </el-select>
      </div>

      <div v-if="hasFavoritePokemons">
        <el-row v-if="favoritedpokemonsListLength > 0" justify="space-around">
          <el-col
            :span="6"
            v-for="pokemon in getPokemonsForRow(0, 3)"
            :key="pokemon.id"
          >
            <pokemon-item :pokemon="pokemon"></pokemon-item>
          </el-col>
        </el-row>
        <el-row v-if="favoritedpokemonsListLength > 3" justify="space-around">
          <el-col
            :span="6"
            v-for="pokemon in getPokemonsForRow(3, 6)"
            :key="pokemon.id"
          >
            <pokemon-item :pokemon="pokemon"></pokemon-item>
          </el-col>
        </el-row>
        <el-row v-if="favoritedpokemonsListLength > 6" justify="space-around">
          <el-col
            :span="6"
            v-for="pokemon in getPokemonsForRow(6, 9)"
            :key="pokemon.id"
          >
            <pokemon-item :pokemon="pokemon"></pokemon-item>
          </el-col>
        </el-row>
        <el-row v-if="favoritedpokemonsListLength > 9" justify="space-around">
          <el-col
            :span="6"
            v-for="pokemon in getPokemonsForRow(9, 12)"
            :key="pokemon.id"
          >
            <pokemon-item :pokemon="pokemon"></pokemon-item>
          </el-col>
        </el-row>
        <el-row v-if="favoritedpokemonsListLength > 12" justify="space-around">
          <el-col
            :span="6"
            v-for="pokemon in getPokemonsForRow(12, 15)"
            :key="pokemon.id"
          >
            <pokemon-item :pokemon="pokemon"></pokemon-item>
          </el-col>
        </el-row>
      </div>
      <h3 v-else>No Favorite Pokemons Found...</h3>
      <br />
      <el-pagination
        background
        layout="prev, pager, next"
        v-model:currentPage="currentPage"
        :page-size="15"
        :total="favoritedpokemonsListLength"
        @current-change="handleCurrentPageChange"
      >
      </el-pagination>
    </base-card>
  </section>
</template>

<script>
import PokemonItem from "../../components/pokemon/PokemonItem.vue";

export default {
  name: "FavoritePage",
  components: { PokemonItem },
  data() {
    return {
      pokemonsToDisplayByPage: this.$store.getters["pokemons/getFavoritePokemonsList"],
      currentPage: 1,
      sortBy: "",
    };
  },
  computed: {
    favoritePokemons() {
      //To access getter that is using namespaced, we need to use the name we use
      //when we create the modules in the store.
      //In this case, 'pokemons/pokemonsList', the 'pokemons' is the module name,
      //The 'pokemonsList' is the getter name.
      return this.$store.getters["pokemons/getFavoritePokemonsList"];
    },
    hasFavoritePokemons() {
      return this.$store.getters["pokemons/hasFavoritePokemons"];
    },
    favoritedpokemonsListLength() {
      return this.$store.getters["pokemons/getFavoritePokemonsList"].length;
    },
  },
  methods: {
    getPokemonsForRow(startIndex, endIndex) {
      return this.pokemonsToDisplayByPage.slice(
        startIndex,
        endIndex
      );
    },
    handleCurrentPageChange() {
      const newStartIndex = (this.currentPage - 1) * 15
      this.pokemonsToDisplayByPage = this.$store.getters["pokemons/getFavoritePokemonsList"].slice(newStartIndex, newStartIndex + 15)  
    },
    sortList() {
      const data = { sortBy: this.sortBy, isSortingFavoriteList: true}
      this.$store.dispatch("pokemons/sortPokemonList", data);
    },
  },
  beforeUnmount() {
    this.$store.dispatch("pokemons/updateFavoriteListInDB")
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pokemon-cards {
  list-style: none;
  margin: 0;
  padding: 0;
  /* display: flex; */
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
