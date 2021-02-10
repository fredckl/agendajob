<template>
  <div class="d-flex flex-wrap"> 
    <div class="card card-add">
      <div class="card-body d-flex justify-content-center align-items-center">
        <router-link class="rounded-circle icon-add" to="/create">
          <b-icon icon="plus-circle"></b-icon>
        </router-link>
      </div>
    </div>
    <div 
      v-for="job in jobs"
      :key="job.id"
      class="card">
      <div class="card-header">{{job.company}}</div>
      <div class="card-body d-flex justify-content-center align-items-center">
        <a v-if="job.url" :href="job.url" class="text-muted">{{job.url}}</a>
      </div>
      <div class="card-footer">
        <div class="d-flex justify-content-center align-items-center actions">
            <router-link :to="`/edit/${job.id}`">
              <b-icon icon="pencil"></b-icon>
            </router-link>
            <a href="#remove" @click.prevent="removeJob(job.id)"><b-icon icon="trash"></b-icon></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { getItemParsed, setItemStringify } from '../helpers';
export default {
  name: 'candidature',
  data () {
    return {
      jobs: []
    }
  },
  methods: {
    removeJob (jobId) {
      this.jobs = this.jobs.filter(({id}) => id !== jobId)
      setItemStringify('jobs', this.jobs);
    }
  },
  computed: {
    addedAt () {
      return moment(this.job.date).format('DD/MM/YYYY')
    }
  },
  beforeMount () {
    this.jobs = getItemParsed('jobs', '[]');
  }
}
</script>

<style lang="scss">
.card {
  height: 300px;
  overflow: auto;
  width: 15rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  a {
    color: inherit;
    // color: #c2c2c2;
  }
}
.card-add {
  .icon-add {
    font-size: 7rem;
  }
  a {
   
    color: #c2c2c2;
  } 
}
.actions {
  a {
    margin-right: 10px;
    margin-left: 10px;
  }
}

</style>