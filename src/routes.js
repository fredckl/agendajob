import Home from './pages/Home.vue'
import Create from './pages/Create.vue'
import Edit from './pages/Edit.vue'
import Error from './pages/Error.vue'

export const routes = [
  { path: '/', component:  Home},
  { path: '/create', component:  Create},
  { path: '/edit/:id', component:  Edit},
  { path: '/*', component:  Error}
]