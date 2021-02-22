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
      <div class="col-6 d-flex align-items-center">
        <label for="color" class="form-label mr-2">Couleur d'étiquette</label>
        <v-input-colorpicker id="color" name="color" v-model="form.color" />
      </div>  
      <div class="col-6">
        <div class="form-group">
          <label for="date" class="form-label">Candidature envoyée le </label>
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
      <div class="col-6">
        <div class="form-group">
          <label for="note" class="form-label">Note personnelle</label>
          <textarea 
            :value="form.note" 
            @input="updateNote"
            ref="noteInput" 
            id="note"
            name="note" 
            class="form-control note-input"></textarea>
            <p class="text-muted font-italic">Vous pouvez utiliser la syntax <a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="_blank">markdown</a></p>
        </div>
      </div>
      <div class="col-6 d-flex align-items-stretch">
        <div class="note-markdown" v-html="noteCompiledMarkdown"></div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="pull-right">
          <button type="submit" class="btn btn-default btn-sm">Sauvegarder</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { required, url } from 'vuelidate/lib/validators';
import { v4 as uuidv4 } from 'uuid';
import toastr from 'toastr';
import moment from 'moment';
import { COLOR_DEFAULT } from '../constants';
import Ajv from 'ajv'
import { job as jobSchema } from '../validator/jobs';
import MarkdownIt from 'markdown-it';
import { pathOr } from 'rambda';
import { debounce } from '../helpers';
const ajv = new Ajv();
const validate = ajv.compile(jobSchema);
const md = new MarkdownIt();

const getDefaultValue = () => ({
  company: null,
  date: moment().format('YYYY-MM-DD'),
  note: null,
  url: null,
  color: COLOR_DEFAULT,
  id: uuidv4()
});


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
  computed: {
    noteCompiledMarkdown () {
      return md.render(pathOr('', ['form', 'note'], this));
    }
  },
  methods: {
    updateNote: debounce(function ({ target: { value }}) {
      this.$set(this.form, 'note', value);
      if (this.$refs.noteInput) {
        const height = this.$refs.noteInput.scrollHeight
        this.$refs.noteInput.style.height = height + 'px';
      }
    }, 300),
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
      const formData = {...this.form, date: moment(this.form.date).format('X')}
      if (!validate(formData)) {
        toastr.error('Veuillez vérifier vos données saisies', 'Erreur de validation')
        return
      }
      this.$emit('onSubmit', formData)
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

<style scoped lang="scss">
.note-input {
  transition: all .3s;
  min-height: 200px;
}
.note-markdown {
  border: solid 1px #ced4da;
  margin-top: 1.9rem;
  margin-bottom: 2.5rem;
  border-radius: 4px;
  width: 100%;
  padding: .5rem;
}
</style>
