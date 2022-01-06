<template>
  <span class="badge" :class="type">
    {{ text }}
  </span>
</template>

<script>
export default {
  props: ['type', 'title'],
  computed: {
    text() {
      return this.title.toString().toUpperCase();
    }
  }
}
</script>

<style scoped>
.badge {
  background-color: #ccc;
  color: white;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
}

.normal {
  background-color: #a4acaf;
}

.water {
  background-color: #278ae7;
}

.grass {
  background-color: #4bc512;
}

.fire {
  background-color: #fd7d24;
}

.dragon {
  background-color: #fd2b24;
}

.bug {
  background-color: #c0bd16;
}

.poison {
  background-color: #682ed3;
}

.flying {
  background-color: #a8cee4;
}

.psychic {
  background-color: #f366b9;
}

.ice {
  background-color: #51c4e7;
}

.electric {
  background-color: #eed535;
}

.ground {
  background-color: #e78851;
}

.fairy {
  background-color: #fdb9e9;
}

.fighting {
  background-color: #d56723;
}

.rock {
  background-color: #a38c21;
}

.steel {
  background-color: #9eb7b8;
}

.ghost {
  background-color: #7b62a3;
}


</style>