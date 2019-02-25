// Import Vue
import Vue from 'vue'

// Import F7
import Framework7 from 'framework7'

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue'

// Import F7 iOS Theme Styles
// import Framework7Theme from 'framework7/dist/css/framework7.ios.min.css'
// import Framework7ThemeColors from 'framework7/dist/css/framework7.ios.colors.min.css'
 // OR for Material Theme:
import Framework7Theme from 'framework7/dist/css/framework7.material.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.material.colors.min.css'


import Framework7Icons from 'framework7-icons/css/framework7-icons.css'

// Import App Custom Styles
import AppStyles from './css/app.css'

// Import EasyTable
import 'vue-easytable/libs/themes-base/index.css'
import {VTable,VPagination} from 'vue-easytable'

// Import Routes
import Routes from './routes.js'

// Import App Component
import App from './index'

// Init F7 Vue Plugin
Vue.use(Framework7Vue)
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)

// Init App
new Vue({
  el: '#app',
  template: '<app/>',
  // Init Framework7 by passing parameters here
  framework7: {
    root: '#app',
    dynamicNavbar: true,
    animateNavBackIcon: true,
    /* Uncomment to enable Material theme: */
    material: true,
    routes: Routes
  },
  // Register App Component
  components: {
    app: App
  }
});