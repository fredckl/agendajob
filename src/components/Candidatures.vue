<template>
  <div class="d-flex flex-wrap"> 
    <div class="card card-add">
      <div class="card-body d-flex justify-content-center align-items-center">
        <router-link class="rounded-circle icon-add" to="/create">
          <b-icon icon="plus-circle"></b-icon>
        </router-link>
      </div>
    </div>
    
    <candidature 
      v-for="job in jobs" 
      :key="job.id" 
      :job="job"
      @onRemove="confirmRemove"
    />
    <confirm 
      msg="Etes-vous certain de vouloir supprimer cette candidature" 
      @onOk="removeJob"
      @onClose="closeModal"/>
  </div>
</template>

<script>
import moment from "moment";
import { getParsedItem, setStringifyItem } from '../helpers';
import Candidature  from './Candidature.vue'
import Confirm from './Confirm.vue';
import { sortBy, prop, reverse, compose } from 'rambda';
import { DATE_FR } from '../constants';
export default {
  name: 'candidatures',
  components: {
    Candidature,
    Confirm
  },
  data () {
    return {
      jobs: [],
      resetId: null
    }
  },
  methods: {
    confirmRemove (jobId) {
      this.resetId = jobId;
      this.$bvModal.show('confirm');
    },
    removeJob () {
      this.jobs = this.jobs.filter(({id}) => id !== this.resetId)
      setStringifyItem('jobs', this.jobs);
    },
    closeModal () {
      this.resetId = null;
    }
  },
  computed: {
    addedAt () {
      return moment(this.job.date).format(DATE_FR)
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
.card-add {
  .icon-add {
    font-size: 7rem;
  }
  a {
   
    color: #c2c2c2;
  } 
}
</style>