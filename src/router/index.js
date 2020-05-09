import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/Home';
import CreateMeetupPage from '../components/meetup/CreateMeetupPage'
import Meetups from '../components/meetup/MeetupPage'
import Meetup from '../components//meetup/Meetup'
import Profile from '../components/user/Profile'
import SignIn from '../components/user/SignIn'
import SignUp from '../components/user/SignUp'
import People from '../components/meetup/People'


import AuthGuard from './auth-guard'

Vue.use(VueRouter)

  const routes = [
    {
      path : '/',
      name : 'Home',
      component :Home,
      beforeEnter: AuthGuard

    },
    {
      path : '/meetups',
      name : 'Meetups',
      component :Meetups,
      beforeEnter: AuthGuard
    },
    {
      path : '/meetups/:id',
      name : 'Meetup',
      props : true,
      component : Meetup,
      beforeEnter: AuthGuard
    },
    {
      path : '/meetup/new',
      name : 'CreatMeetupPage',
      component : CreateMeetupPage,
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
  routes
})

export default router
