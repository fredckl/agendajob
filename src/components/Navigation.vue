<template>
  <nav class="container mt-20 navigation">
    <router-link 
      v-for="(nav, index) in navigations"
      :key="index"
      :to="nav.to"
      class="btn btn-sm mr-2"
    >
      {{nav.label}}
    </router-link>
  </nav>
</template>

<script>
export default {
  name: "navigation",
  data: () => ({
    navigations: [
      {
        to: '/',
        label: 'Mes candidatures'
      },
      {
        to: '/create',
        label: 'Ajouter une candidature'
      },
      {
        to: '/manage-data',
        label: 'Gérer mes données'
      },
    ]
  })
}
</script>

<style lang="scss">
.navigation {
  .btn {
    border-radius: 0;
  }
}
.router-link-exact-active {
  border-bottom: 1px solid var(--default-color) !important;
}
</style>