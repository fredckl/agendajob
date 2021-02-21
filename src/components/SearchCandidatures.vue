<template>
  <div class="search d-flex">
    <input 
      @input="onSearch"
      v-model="search"
      class="form-control" 
      placeholder="rechercher une candidature" 
    />
    <button 
      v-if="search.length"
      @click="onClean"
      class="btn" 
    >
      <b-icon icon="x"></b-icon>
    </button>
  </div>
</template>

<script>
import { path } from 'rambda';
export default {
  data () {
    return {
      search: ''
    }
  },
  methods: {
    onSearch (e) {
      this.$emit('onSearch', path(['target', 'value'], e))
    },
    onClean () {
      this.$set(this, 'search', '');
      this.$emit('onSearch', '')
    }
  }
}
</script>

<style>

</style>