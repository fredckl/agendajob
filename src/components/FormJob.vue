<template>  
  <form @submit.stop.prevent="onSubmit" method="post" clas="needs-validation" novalidate>
    <div class="row mb-3">
      <div class="col-6">
        <div class="form-group">
          <label for="company" class="form-label">Nom de la société</label>
          <input 
            type="text" 
            class="form-control" 
            v-model.trim="form.company" 
            id="company"
            name="company"
            placeholder="Helvetica partners" 
            :class="{ 'is-invalid': submitted && $v.form.company.$error }"
          />
          <div v-if="submitted && !$v.form.company.required" class="invalid-feedback">Ce champ est obligatoire</div>
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label for="url" class="form-label">Site internet</label>
          <input 
            type="text" 
            class="form-control" 
            id="url"
            name="url"
            v-model.trim="form.url"
            placeholder="https://www.helvetica-partners.com/fr/"
            :class="{ 'is-invalid': submitted && $v.form.url.$error }"
          />
          <div v-if="submitted && !$v.form.url.url" class="invalid-feedback">Url de site internet non valide</div>
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-6">
        <div class="form-group">
          <label for="note" class="form-label">Note personnelle</label>
          <textarea v-model="form.note" id="note" name="note" class="form-control"></textarea>
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label for="date" class="form-label">Date de l'offre</label>
          <b-form-datepicker 
            id="date" 
            v-model="form.date" 
            name="date"
            class="mb-2"
          ></b-form-datepicker>
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col d-flex align-items-center">
        <label for="color" class="form-label mr-2">Couleur d'étiquette</label>
        <v-input-colorpicker id="color" name="color" v-model="form.color" />
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
import { required, url } from 'vuelidate/lib/validators';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { COLOR_DEFAULT } from '../constants';

const getDefaultValue = () => ({
  company: null,
  date: moment().format('YYYY-MM-DD'),
  note: null,
  url: null,
  color: COLOR_DEFAULT,
  id: uuidv4()
})
export default {
  name: 'form-job',
  props: ['job'],
  data () {
    return {
      submitted: false,
      form: getDefaultValue()
    }
  },
  validations: {
    form: {
      company: {
        required
      },
      url: {
        url
      }
    }
  },
  methods: {
    validateState(item) {
      const { $dirty, $error } = item
      return $dirty ? !$error : null
    },
    onSubmit () {
      this.submitted = true;
      this.$v.$touch()
      if (this.$v.$invalid) {
        return false;
      }
      this.$emit('onSubmit', {...this.form, date: moment(this.form.date).format('X')})
    },
    resetFields () {
      this.form = getDefaultValue();
    },
  },
  beforeMount () {
    if (this.job) {
      this.form = this.job
    }
  }
}
</script>
