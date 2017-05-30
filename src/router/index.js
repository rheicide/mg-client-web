import Vue from 'vue'
import Router from 'vue-router'
import Mails from '@/components/Mails'
import MailDetails from '@/components/MailDetails'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Mails',
      component: Mails
    },
    {
      path: '/:id',
      name: 'MailDetails',
      component: MailDetails,
      props: true
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
