<template>
  <div class="container">
    <div class="content">
      <div class="row mb-3">
        <div class="col">
          <div class="alert alert-info">
            <p class="mb-0">
              Ce site n'utilise aucun cookie et ne sauvegarde aucune de vos données sur un serveur tiers.
              <br />
              Ce que vous faites ici vous appartient en intégralité. 
              <br />
              En revanche, effacer les données de votre navigateur peut vous faire perdre vos candidatures enregistrées sur ce site. 
              <br />
              C'est pourquoi nous avons mis en place un outil qui vous permet d'exporter et d'importer vos données.
            </p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-6 text-center">
          <button type="button" class="btn btn-warning" @click="exportData" role="button">Sauvegarder mes données</button>
        </div>
        <div class="col-6 text-center">
          <button type="button" class="btn btn-warning" @click="selectFile" role="button">Importer mes données</button>
          <input type="file" id="import-data" @change="importData" class="d-none"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getItem, getParsedItem, setStringifyItem } from '../helpers'
import toastr from 'toastr';
import Ajv from 'ajv'
import { jobs as jobsSchema } from '../validator/jobs';
import { filter, propEq, find, isEmpty } from 'rambda';

const ajv = new Ajv();
const validate = ajv.compile(jobsSchema);
const ACCEPT_FILE_TYPE = 'application/json';

export default {
  name: 'manage-content',
  methods: {
    exportData () {
      const jobs = getItem('jobs');
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jobs));
      element.setAttribute('download', 'agendajob-mes-donnees.json');

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },
    selectFile () {
      document.querySelector('#import-data').click();
    },
    importData (event) {
      const file = event.target.files[0];
      const toastrError = () => toastr.error('Le fichier n\'est pas valide', 'Erreur de fichier');
      if (file.type !== ACCEPT_FILE_TYPE) {
        toastrError();
        return;
      }

      const reader = new FileReader();
      reader.addEventListener('load', (event) => {
        const data = JSON.parse(event.target.result);

        if (!validate(data)) {
          toastrError();
          return;
        }
        
        const actualData = getParsedItem('jobs', []);
        const onlyNotExistsData = filter(({id}) => !find(propEq('id', id))(actualData))(data);
        if (isEmpty(onlyNotExistsData)) {
          toastr.info('Aucune nouvelle donnée n\'a été importée', 'Importation');
          return;
        }

        setStringifyItem('jobs', [...actualData, ...onlyNotExistsData])
        toastr.success('Vos données ont correctement été importées', 'Importation')
      })
      reader.readAsText(file);
    }

  }

}
</script>

<style>

</style>