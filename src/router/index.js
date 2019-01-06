import Vue from 'vue'
import Router from 'vue-router'

import SoundListView from '@/components/SoundList'
import SoundMonitorView from '@/components/SoundMonitor'
import SoundDetailView from '@/components/SoundDetail'
import DocumentationView from '@/components/Documentation'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', redirect: { name: 'SoundList' }
    },
    {
      path: '/sounds/',
      name: 'SoundList',
      component: SoundListView
    },
    {
      path: '/sounds/:id/',
      name: 'SoundDetail',
      component: SoundDetailView,
      props: true // allow <id> to be used as a part of props in the component
    },
    {
      path: '/new_sound/:ctid/',
      name: 'SoundMonitor',
      component: SoundMonitorView,
      props: true // allow <ctid> to be used as a part of props in the component
    },
    {
      path: '/documentation/',
      name: 'Documentation',
      component: DocumentationView,
      props: true // allow <id> to be used as a part of props in the component
    }
  ]
})
