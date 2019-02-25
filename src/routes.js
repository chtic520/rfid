export default [
  {
    path: '/about/',
    component: require('./pages/about.vue')
  },
  {
    path: '/flightNumber/',
    component: require('./pages/flightNumber.vue')
  },
  {
    path: '/quick/:flightNumber/',
    component: require('./pages/quick.vue')
  },
  {
    path: '/',
    component: require('./index.vue')
  }
]