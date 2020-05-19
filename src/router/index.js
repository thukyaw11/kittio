import Vue from 'vue'
import VueRouter from 'vue-router'


import CreateNewPost from '../components/feed/CreateNewPost';
import Feed from '../components/feed/Feed'
import Feeds from '../components/feed/Feeds'
import Profile from '../components/user/Profile'
import SignIn from '../components/user/SignIn'
import SignUp from '../components/user/SignUp'
import People from '../components/feed/People'



import AuthGuard from './auth-guard'

Vue.use(VueRouter)

  const routes = [
    {
      path : '/feeds',
      name : 'Feeds',
      component :Feeds,
      beforeEnter: AuthGuard
    },
    {
      path : '/feed/:id',
      name : 'Feed',
      props : true,
      component : Feed,
      beforeEnter: AuthGuard
    },
    {
      path : '/feednew/new',
      name : 'CreateNewPost',
      component : CreateNewPost,
      beforeEnter: AuthGuard
    },
    {
      path : '/profile',
      name : 'Profile',
      component : Profile,
      beforeEnter: AuthGuard
    },
    {
      path : '/people',
      name : 'People',
      component : People,
      beforeEnter : AuthGuard
    },
    {
      path : '/signup',
      name : 'Signup',
      component : SignUp
    },
    {
      path : '/signin',
      name : 'Signin',
      component : SignIn
    }
]

const router = new VueRouter({
  routes,
  mode : 'history'
})

export default router
