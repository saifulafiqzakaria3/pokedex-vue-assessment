<!-- 

  Get Pokemon List from API with Limit and Offset
 "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20" 
 
 -->

<template>
  <section>
    <pokemon-filter style="max-width: 80%"></pokemon-filter>
  </section>
  <section v-loading="isLoading">
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
      <div v-if="hasPokemons">
        <el-row v-if="pokemonListLength > 0" justify="space-around">
          <el-col
            :span="6"
            v-for="pokemon in getPokemonsForRow(0, 3)"
            :key="pokemon.id"
          >
            <pokemon-item :pokemon="pokemon"></pokemon-item>
          </el-col>
        </el-row>
        <el-row v-if="pokemonListLength > 3" justify="space-around">
          <el-col
            :span="6"
            v-for="pokemon in getPokemonsForRow(3, 6)"
            :key="pokemon.id"
          >
            <pokemon-item :pokemon="pokemon"></pokemon-item>
          </el-col>
        </el-row>
        <el-row v-if="pokemonListLength > 6" justify="space-around">
          <el-col
            :span="6"
            v-for="pokemon in getPokemonsForRow(6, 9)"
            :key="pokemon.id"
          >
            <pokemon-item :pokemon="pokemon"></pokemon-item>
          </el-col>
        </el-row>
        <el-row v-if="pokemonListLength > 9" justify="space-around">
          <el-col
            :span="6"
            v-for="pokemon in getPokemonsForRow(9, 12)"
            :key="pokemon.id"
          >
            <pokemon-item :pokemon="pokemon"></pokemon-item>
          </el-col>
        </el-row>
        <el-row v-if="pokemonListLength > 12" justify="space-around">
          <el-col
            :span="6"
            v-for="pokemon in getPokemonsForRow(12, 15)"
            :key="pokemon.id"
          >
            <pokemon-item :pokemon="pokemon"></pokemon-item>
          </el-col>
        </el-row>
      </div>
      <h3 v-else>No Pokemons Found</h3>
      <br />
      <el-pagination
        background
        layout="prev, pager, next"
        v-model:currentPage="currentPage"
        :page-size="15"
        :total="totalAllPokemons"
        @current-change="handleCurrentPageChange"
      >
      </el-pagination>
    </base-card>
  </section>
</template>

<script>
import PokemonItem from "../../components/pokemon/PokemonItem.vue";
import PokemonFilter from "../../components/pokemon/PokemonFilter.vue";

export default {
  name: "Homepage",
  components: { PokemonItem, PokemonFilter },
  data() {
    return {
      currentPage: 1,
      sortBy: "ascending",
      isLoading: false
    };
  },
  computed: {
    filteredPokemons() {
      //To access getter that is using namespaced, we need to use the name we use
      //when we create the modules in the store.
      //In this case, 'pokemons/pokemonsList', the 'pokemons' is the module name,
      //The 'pokemonsList' is the getter name.
      return this.$store.getters["pokemons/pokemonsList"];
    },
    hasPokemons() {
      return this.$store.getters["pokemons/hasPokemons"];
    },
    totalAllPokemons() {
      return this.$store.getters["pokemons/getAllPokemonsTotal"];
    },
    pokemonListLength() {
      return this.$store.getters["pokemons/pokemonsList"].length;
    },
  },
  methods: {
    async loadPokemonsFromAPI(currentPageNumber) {
      this.isLoading = true
      const offset = (currentPageNumber - 1) * 15;
      await this.$store.dispatch("pokemons/loadPokemonsList", offset);
      this.isLoading = false
    },
    getPokemonsForRow(startIndex, endIndex) {
      return this.$store.getters["pokemons/pokemonsList"].slice(
        startIndex,
        endIndex
      );
    },
    handleCurrentPageChange() {
      if (this.$store.getters["pokemons/getCurrentTypeToSearch"].length > 0) {
        const offset = (this.currentPage - 1) * 15;
        this.$store.dispatch("pokemons/searchPokemonByTypes", {type: this.$store.getters["pokemons/getCurrentTypeToSearch"], offset});
      } else {
        this.loadPokemonsFromAPI(this.currentPage);
      }
    },
    sortList() {
      const data = { sortBy: this.sortBy, isSortingFavoriteList: false}
      this.$store.dispatch("pokemons/sortPokemonList", data);
    },
  },
  created() {
    this.loadPokemonsFromAPI(this.currentPage);
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
