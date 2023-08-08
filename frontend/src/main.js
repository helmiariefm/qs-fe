import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
    faChevronLeft,
    faChevronRight,
    faHome, 
    faUsers, 
    faStoreAlt, 
    faCog, 
    faUser, 
    faBell, 
    faSave, 
    faSearch,
    faUpload,
    faEnvelope,
    faEye,
    faLock
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const app = createApp(App)
const pinia = createPinia()

library.add(
    faChevronLeft,
    faChevronRight,
    faHome, 
    faUsers, 
    faStoreAlt, 
    faCog, 
    faUser, 
    faBell, 
    faSave, 
    faSearch,
    faUpload,
    faEnvelope,
    faEye,
    faLock
)
app.component('font-awesome-icon', FontAwesomeIcon)

pinia.use(({store}) => {
    store.router = markRaw(router)
})

app.use(pinia)
app.use(router)

app.mount('#app')
