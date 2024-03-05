import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage'; // Adjust the path according to your project structure
import Json1Form from '../components/Json1Form.vue';
import Json2Form from '../components/Json2Form.vue'; // Placeholder for now
import Json3Form from '../components/Json3Form.vue'; // Placeholder for now

const routes = [

  { path: '/',name: 'homepage',component: HomePage },
  { path: '/json1', component: Json1Form },
  { path: '/json2', component: Json2Form },
  { path: '/json3', component: Json3Form }
];




const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

