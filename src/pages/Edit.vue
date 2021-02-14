<template>
  <div class="container">
    <div class="content">
      <div class="row mb-3">
        <div class="col">
          <h1>Nouvelle candidature</h1>
        </div>
      </div>
      <form-job :job="job" @onSubmit="onSubmit"/>
    </div>
  </div>
</template>

<script>
import { FormJob } from '../components';
import { setStringifyItem, getParsedItem, timestampToDate } from '../helpers';
import toastr from 'toastr';
export default {
  name: 'edit',
  components: {
    FormJob 
  },
  data: () => ({
    job: {}
  }),
  methods: {
    onSubmit (newJob) {
      const jobs = getParsedItem('jobs', []);
      const newJobs = jobs.map((job) => job.id === newJob.id ? newJob : job)
      setStringifyItem('jobs', newJobs);
      toastr.success('vos modifications ont bien été enregistrées!', 'Yeah!!');
      this.$router.push('/');
    }
  },
  beforeMount () {
    const jobId = this.$route.params.id;
    const jobs = getParsedItem('jobs');
    const job = jobs.find(({id}) => jobId === id);
    this.job = {...job, date: timestampToDate(job.date)}
  }
}
</script>

<style>

</style>