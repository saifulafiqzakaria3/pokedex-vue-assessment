<template>
  <the-header></the-header>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <router-view> </router-view>
</template>

<script>
import TheHeader from './components/layout/Header.vue';

export default {
  name: 'App',
  components: {
    TheHeader
  },
  beforeCreate() {
    this.$store.dispatch("pokemons/fetchFavoriteListFromDB")
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
  /* text-align: center; */
}
</style>
