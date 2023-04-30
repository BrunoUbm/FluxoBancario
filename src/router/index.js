import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/LoginPage')
  },
  {
    path: `/usuario/:usuario/:id`,
    name: 'usuario',
    component: () => import('../views/MainPage'),
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
