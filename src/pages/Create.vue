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
  name: 'create',
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
      jobs.unshift(this.form);
      setItemStringify('jobs', jobs);
      this.resetFields()
      toastr.success('votre nouvelle candidature a bien été enregistrée!', 'Yeah!!');
      this.$router.push('/');
    }
  }
}
</script>

<style>

</style>