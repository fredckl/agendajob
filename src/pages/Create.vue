<template>
  <div class="container">
    <div class="content">
      <div class="row mb-3">
        <div class="col">
          <h1>Nouvelle candidature</h1>
        </div>
      </div>
      <form-job @onSubmit="onSubmit"/>
    </div>
  </div>
</template>

<script>
import { FormJob } from '../components';
import { setStringifyItem, getParsedItem } from '../helpers';
import toastr from 'toastr';
export default {
  name: 'create',
  components: {
    FormJob 
  },
  methods: {
    onSubmit (job) {
      const jobs = getParsedItem('jobs', []);
      jobs.unshift(job);
      setStringifyItem('jobs', jobs);
      toastr.success('votre nouvelle candidature a bien été enregistrée!', 'Yeah!!');
      this.$router.push('/');
    }
  }
}
</script>

<style>

</style>