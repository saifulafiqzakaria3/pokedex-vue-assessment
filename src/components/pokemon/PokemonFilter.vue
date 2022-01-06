<template>
  <base-card>
    <h2>Find Pokemon</h2>
    <div style="justify: space-between; display: flex">
      <div style="width: 50%">
        <input
          type="text"
          placeholder="Search Pokemon By ID or Exact Name..."
          name="search"
          v-model="input"
        />
        <button class="search-button" @click="searchPokemon">
          <i class="fa fa-search"></i>
        </button>
      </div>
      <div style="flex-grow: 1"></div>
      <el-select v-model="typesToFilter" clearable placeholder="Filter by Types" @change="searchByTypes">
        <el-option
          v-for="type in allPokemonTypes"
          :key="type"
          :label="type"
          :value="type.toLowerCase()"
        >
        </el-option>
      </el-select>
    </div>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      typesToFilter: "",
    };
  },
  computed: {
    allPokemonTypes() {
      //To access getter that is using namespaced, we need to use the name we use
      //when we create the modules in the store.
      //In this case, 'pokemons/pokemonsList', the 'pokemons' is the module name,
      //The 'pokemonsList' is the getter name.
      return this.$store.getters["pokemons/getPokemonTypes"];
    },
  },
  methods: {
    async searchPokemon() {
      this.typesToFilter = ""
      if (!this.input.trim()) {
        this.$store.dispatch("pokemons/loadPokemonsList", 0);
      } else {
        this.$store.dispatch("pokemons/searchPokemon", this.input);
      }
    },
    loadPokemonTypesFromAPI() {
      this.$store.dispatch("pokemons/fetchPokemonTypes");
    },
    searchByTypes() {
      if (this.typesToFilter.length == 0) {
        this.$store.dispatch("pokemons/loadPokemonsList", 0);
      } else {
        this.$store.dispatch("pokemons/searchPokemonByTypes", {type: this.typesToFilter, offset: 0});
      }
    },
  },
  created() {
    this.loadPokemonTypesFromAPI();
  },
};
</script>

<style scoped>
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}

/* Style the search field */
input[type="text"] {
  padding: 10px;
  font-size: 17px;
  border: 1px solid grey;
  float: left;
  width: 80%;
  background: #f1f1f1;
  /* margin-right: 2px; */
}

/* Style the submit button */
.search-button {
  float: left;
  width: 20%;
  padding: 10px;
  background: #2196f3;
  color: white;
  font-size: 17px;
  border: 1px solid grey;
  border-left: none; /* Prevent double borders */
  cursor: pointer;
}

button:hover {
  background: #0b7dda;
}

/* Clear floats */
form.example::after {
  content: "";
  clear: both;
  display: table;
}
</style>
