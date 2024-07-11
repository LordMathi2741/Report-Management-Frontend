
import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import "primeflex/themes/primeone-light.css";
import Aura from '@primevue/themes/aura';
import InputText from 'primevue/inputtext';
import 'primeicons/primeicons.css'
import Button from 'primevue/button';
import router from './router/router.js'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Menu from 'primevue/menu';



const app = createApp(App)
app.use(router)
app.use(PrimeVue,{
  theme: {
    preset: Aura
  }
});
app.component('pv-button', Button);
app.component('pv-inputext', InputText);
app.component('pv-datatable', DataTable);
app.component('pv-column', Column);
app.component('pv-menu', Menu);
app.mount('#app')
