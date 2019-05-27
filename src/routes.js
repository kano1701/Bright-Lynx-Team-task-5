import VueRouter from 'vue-router'
import Home from './pages/Home'
import Login from './pages/Login'
import Reg from './pages/Registration'
import Users from './pages/Users'

export default new VueRouter({
  routes: [
    {
      path: '',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/registration',
      component: Reg
    },
    {
      path: '/users',
      component: Users
    }
  ],
  mode: 'history'
})
