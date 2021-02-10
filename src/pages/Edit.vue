<template>
  <div class="container">
    <div class="content">
      <div class="row mb-3">
        <div class="col">
          <h1>Nouvelle candidature</h1>
        </div>
      </div>
      <form-job :form="form" :onSubmit="onSubmit"/>
    </div>
  </div>
</template>

<script>
import { FormJob } from '../components';
import { setItemStringify, getItemParsed } from '../helpers';
import { v4 as uuidv4 } from 'uuid';
import toastr from 'toastr';
export default {
  name: 'edit',
  components: {
    FormJob 
  },
  data: () => ({
    form: {
      company: null,
      date: new Date(),
      url: null,
      id: uuidv4()
    }
  }),
  methods: {
    resetFields () {
      this.form = {
        company: null,
        date: new Date(),
        url: null,
        id: uuidv4()
      }
    },
    onSubmit () {
      const jobs = getItemParsed('jobs', '[]');
      const newJobs = jobs.map((job) => {
        if (job.id === this.form.id) {
          return this.form;
        }
        return job;
      })
      setItemStringify('jobs', newJobs);
      this.resetFields()
      toastr.success('vos modifications ont bien été enregistrées!', 'Yeah!!');
      this.$router.push('/');
    }
  },
  beforeMount () {
    const jobId = this.$route.params.id;
    const jobs = getItemParsed('jobs');
    this.form = jobs.find(({id}) => jobId === id)
  }
}
</script>

<style>

</style>