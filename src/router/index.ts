import { createRouter, createWebHistory } from 'vue-router'
import ToDoView from '../views/ToDoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/to-do',
    },
    {
      path: '/to-do',
      name: 'to-do',
      component: ToDoView,
    },
  ],
})

export default router
