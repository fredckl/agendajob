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
              En revanche, effacer les données de votre navigateur peu vous faire perdre vos candidatures enregistrées sur ce site. 
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
          <button type="button" class="btn btn-warning" disabled @click="importData" role="button">Importer mes données</button>
          <p class="text-muted">Cette fonctionnalité est en cours de développement, merci de revenir plus tard 😀.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getItem } from '../helpers'
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
      
      console.log('export data')
    },

    importData () {
      console.log('import data')
    }

  }

}
</script>

<style>

</style>