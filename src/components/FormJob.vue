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
        <label for="date" class="form-label">Date de l'offre</label>
        <b-form-datepicker 
          id="date" 
          v-model="form.date" 
          class="mb-2"
        ></b-form-datepicker>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col">
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
export default {
  name: 'form-job',
  props: ['form', 'onSubmit']
}
</script>
