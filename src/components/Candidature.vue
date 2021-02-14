<template>
  <div class="card" :style="{borderColor: color }">
    <div class="card-header d-flex flex-column">
      <div class="truncate">{{job.company}}</div>
      <div class="text-right font-weight-light text-muted"><small>{{candidatureDate}}</small></div>
    </div>
    <div class="card-body">
      <p>{{job.note}}</p>
      <a v-if="job.url" :href="job.url" class="text-muted">{{job.url}}</a>
    </div>
    <div class="card-footer">
      <div class="d-flex justify-content-center align-items-center actions">
          <router-link :to="`/edit/${job.id}`">
            <b-icon icon="pencil"></b-icon>
          </router-link>
          <a href="#remove" @click.prevent="$emit('onRemove', job.id)"><b-icon icon="trash"></b-icon></a>
      </div>
    </div>
    
  </div>
</template>

<script>
import moment from 'moment';
import { COLOR_DEFAULT, DATE_FR } from '../constants';
import { timestampToDate } from '../helpers';

export default {
  name: "candidature",
  props: ['job'],
  data () {
    return {
      defaultColor: COLOR_DEFAULT
    }
  },  
  computed: {
    candidatureDate () {
      return moment(timestampToDate(this.job.date)).format(DATE_FR);
    },
    color () {
      return this.job.color
    }
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
  hyphens: auto;
  a {
    color: inherit;
  }
}
.truncate {
  width: 13rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.actions {
  a {
    margin-right: 10px;
    margin-left: 10px;
  }
}
</style>