<template>
  <div class="container mb-4">
    <h1>Mes candidatures</h1>  
    <candidatures :jobs="jobs"/>
  </div>
</template>

<script>
import { Candidatures } from '../components';
import { compose, prop, reverse, sortBy } from 'rambda';
import { getParsedItem } from '../helpers';

export default {
  name: 'home',
  components: {
    Candidatures
  },
  data () {
    return {
      jobs: {}
    }
  },
  beforeMount () {
    this.jobs = compose(
      reverse,
      sortBy(prop('date'))
    )(getParsedItem('jobs', []));
  }
}
</script>

<style lang="scss">

</style>