<template>  
  <form @submit.prevent="onSubmit" method="post">
    <div class="row mb-3">
      <div class="col-6">
        <label for="company" class="form-label">Nom de la société</label>
        <input 
          type="text" 
          class="form-control" 
          v-model="form.company" 
          id="company" 
          placeholder="Helvetica partners" 
        />
      </div>
      <div class="col-6">
        <label for="company" class="form-label">Site internet</label>
        <input 
          type="text" 
          class="form-control" 
          id="company" 
          v-model="form.url"
          placeholder="https://www.helvetica-partners.com/fr/"
        />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-6">
        <label for="note" class="form-label">Note personnelle</label>
        <textarea v-model="form.note" id="note" class="form-control"></textarea>
      </div>
      <div class="col-6">
        <label for="date" class="form-label">Date de l'offre</label>
        <b-form-datepicker 
          id="date" 
          v-model="form.date" 
          class="mb-2"
        ></b-form-datepicker>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col d-flex align-items-center">
        <label for="color" class="form-label mr-2">Couleur d'étiquette</label>
        <v-input-colorpicker id="color" v-model="form.color" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="pull-right">
          <button type="submit" class="btn btn-primary btn-sm">Sauvegarder</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
export default {
  name: 'form-job',
  props: ['job'],
  data () {
    return {
      form: {
        company: null,
        date: new Date(),
        note: null,
        url: null,
        color: null,
        id: uuidv4()
      }
    }
  },
  methods: {
    onSubmit () {
      this.$emit('onSubmit', this.form)
    },
    resetFields () {
      this.form = {
        company: null,
        date: new Date(),
        url: null,
        id: uuidv4()
      }
    },
  },
  beforeMount () {
    if (this.job) {
      this.form = this.job
    }
  }
}
</script>
