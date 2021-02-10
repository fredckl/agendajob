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
import { setItemStringify, getItemParsed } from '../helpers';
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
      const jobs = getItemParsed('jobs', '[]');
      const newJobs = jobs.map((job) => job.id === newJob.id ? newJob : job)
      setItemStringify('jobs', newJobs);
      toastr.success('vos modifications ont bien été enregistrées!', 'Yeah!!');
      this.$router.push('/');
    }
  },
  beforeMount () {
    const jobId = this.$route.params.id;
    const jobs = getItemParsed('jobs');
    this.job = jobs.find(({id}) => jobId === id)
  }
}
</script>

<style>

</style>