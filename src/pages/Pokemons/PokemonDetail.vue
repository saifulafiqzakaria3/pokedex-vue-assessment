<!--  
o	Pokemon ID, name, picture, description /
o	Pokemon types /
o	Pokemon height, weight, gender, category /
o	Pokemon weaknesses [Bonus]
o	Pokemon abilities /
o	Basic stats (HP, Attack, Defense, Speed, etc) /
o	Evolution chain [Bonus]

call https://pokeapi.co/api/v2/pokemon-species/{id or name}/ to get description
 -->

<template>
  <div class="details-content">
    <br />
    <div
      style="
        display: flex;
        justify-content: space-between;
        width: 80%;
        margin: auto;
      "
    >
      <button
        class="previous-button"
        style="vertical-align: middle"
        @click="togglePokemon(currentId - 1)"
        :disabled="currentId == 1"
      >
        <span>Previous</span>
      </button>
      <button
        class="next-button"
        style="vertical-align: middle"
        @click="togglePokemon(currentId + 1)"
      >
        <span>Next </span>
      </button>
    </div>
    <section v-loading="isLoading">
      <base-card style="display: flex">
        <div style="width: 40%">
          <h1>{{ name }}</h1>
          <h2 id="pokemonid" style="color: #99a9bf">#{{ currentId }}</h2>
          <img :src="imageUrl" alt="pokemon" />
        </div>
        <div id="info">
          <ul style="margin-right: 1em">
            <li>
              <span class="attribute-title">Height</span>
              <span class="attribute-value">{{ height }} M</span>
            </li>
            <li>
              <span class="attribute-title">Weight</span>
              <span class="attribute-value">{{ weight }} KG</span>
            </li>
          </ul>
          <ul>
            <li>
              <span class="attribute-title">Gender</span>
              <span class="attribute-value">{{ gender }}</span>
            </li>
            <li>
              <span class="attribute-title">Category</span>
              <span class="attribute-value"> - </span>
            </li>
          </ul>
        </div>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Type</h2>
          <base-badge
            v-for="type in types"
            :key="type"
            :type="type.toLowerCase()"
            :title="type"
          ></base-badge>
        </header>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Abilities</h2>
          <base-badge
            v-for="ability in abilities"
            :key="ability"
            :title="ability"
          ></base-badge>
        </header>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Statistic</h2>
        </header>
        <ul>
          <li v-for="stat in stats" :key="stat">
            <h3 class="stat-name">{{ stat.name }} : </h3>
            <span class="stat-value">{{ stat.value }}</span>
          </li>
        </ul>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      selectedPokemon: null,
      currentId: +this.id,
      isLoading: false
    };
  },
  created() {
    this.selectedPokemon = this.$store.getters["pokemons/pokemonsList"].find(
      (pokemon) => pokemon.id === +this.id
    );
  },
  computed: {
    name() {
      return this.selectedPokemon.name;
    },
    imageUrl() {
      return this.selectedPokemon.previewImageUrl;
    },
    types() {
      return this.selectedPokemon.types;
    },
    height() {
      return this.selectedPokemon.height;
    },
    weight() {
      const convertedWeight = this.selectedPokemon.weight.toString()
      return convertedWeight.substring(0, convertedWeight.length - 1)
    },
    gender() {
      return this.selectedPokemon.gender;
    },
    abilities() {
      return this.selectedPokemon.abilities
        .filter((ability) => !ability.is_hidden)
        .map((ability) => ability.ability.name);
    },
    stats() {
      return this.selectedPokemon.stats.map((stat) => {
        return {
          name: stat.stat.name,
          value: stat.base_stat,
        };
      });
    },
  },
  methods: {
    async togglePokemon(id) {
      this.isLoading = true
      this.currentId = id;
      this.selectedPokemon = await this.$store.dispatch("pokemons/loadPokemonDetailBasedOnID", id);
      this.isLoading = false
    },
  },
};
</script>

<style scoped>
.details-content {
  text-align: center;
}

h1 {
  text-transform: capitalize;
  margin-bottom: 0;
}

#pokemonid {
  margin-top: 5px;
  margin-bottom: 0;
}

img {
  height: 200px;
  width: 200px;
}

#info {
  background-color: #30a7d7;
  width: 50%;
  margin-top: 2rem;
  margin-bottom: 2rem;
  border-radius: 12px;
  padding-left: 1em;
  padding-right: 1em;
  display: flex;
}

span {
  display: block;
}

.attribute-title {
  color: #fff;
  font-size: 100%;
}

.attribute-value {
  color: #212121;
  font-size: 125%;
}

.stat-name {
  text-transform: capitalize;
  display: inline;
}

.stat-value {
  font-size: 150%;
  display: inline;
}

ul {
  list-style: none;
}

ul > li {
  margin-top: 1em;
  margin-bottom: 1em;
}

.next-button {
  display: inline-block;
  border-radius: 4px;
  background-color: #f4511e;
  border: none;
  color: #ffffff;
  text-align: center;
  font-size: 28px;
  padding: 20px;
  width: 200px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
}

.next-button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.next-button span:after {
  content: "\00bb";
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.next-button:hover span {
  padding-right: 25px;
}

.next-button:hover span:after {
  opacity: 1;
  right: 0;
}

.previous-button {
  display: inline-block;
  border-radius: 4px;
  background-color: #f4511e;
  border: none;
  color: #ffffff;
  text-align: center;
  font-size: 28px;
  padding: 20px;
  width: 200px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
}

.previous-button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.previous-button span:after {
  content: "\00AB";
  position: absolute;
  opacity: 0;
  top: 0;
  left: -20px;
  transition: 0.5s;
}

.previous-button:hover span {
  padding-left: 25px;
}

.previous-button:hover span:after {
  opacity: 1;
  left: -20px;
}
</style>
