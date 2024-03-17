import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginVue.vue'
import RegisterView from '@/views/RegisterView.vue'
import ConfirmationCode from '@/views/ConfirmationCodeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/confirm_code',
      name: 'confirm code',
      component: ConfirmationCode
    },
  ]
})

export default router
