<template>
  <div>
    <div class="row mb-3">
      <div class="col">
        <search-candidatures @onSearch="onSearch"/>
      </div>
    </div>
    <div class="d-flex flex-wrap"> 
      <div v-if="!isSearched" class="card card-add">
        <div class="card-body d-flex justify-content-center align-items-center">
          <router-link class="rounded-circle icon-add" to="/create">
            <b-icon icon="plus-circle"></b-icon>
          </router-link>
        </div>
      </div>
      <candidature 
        v-for="job in allJobs" 
        :key="job.id" 
        :job="job"
        @onRemove="confirmRemove"
      />
      <confirm 
        msg="Etes-vous certain de vouloir supprimer cette candidature" 
        @onOk="removeJob"
        @onClose="closeModal"/>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { setStringifyItem } from '../helpers';
import Candidature  from './Candidature.vue'
import SearchCandidatures  from './SearchCandidatures.vue'
import Confirm from './Confirm.vue';
import {
    compose,
    filter,
    includes,
    isEmpty,
    toLower,
    paths,
    join
} from 'rambda';
import { DATE_FR } from '../constants';
import S from "string";

const toLatinise = value => S(value).latinise().s;

export default {
  name: 'candidatures',
  components: {
    Candidature,
    SearchCandidatures,
    Confirm
  },
  props: {
    jobs: Array
  },
  data () {
    return {
      isSearched: false,
      allJobs: this.jobs,
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
    },
    onSearch (query) {
      if (isEmpty(query)) {
        this.$set(this, 'isSearched', false);
        this.$set(this, 'allJobs', this.jobs);
        return;
      }
      const prepareQuery = compose(
        toLatinise,
        toLower
      )(query)

      const jobsFiltered = filter(
        compose(
          includes(prepareQuery), 
          toLower, 
          toLatinise,
          join(' '),
          paths([['company'], ['note']])
        ))(this.jobs)
  
      this.$set(this, 'allJobs', jobsFiltered);
      this.$set(this, 'isSearched', true);
    }
  },
  computed: {
    addedAt () {
      return moment(this.job.date).format(DATE_FR)
    }
  }
}
</script>

<style lang="scss">
.card-body {
  overflow: scroll
}
.card-add {
  .icon-add {
    font-size: 7rem;
  }
  a {
   
    color: #c2c2c2;
  } 
}
</style>