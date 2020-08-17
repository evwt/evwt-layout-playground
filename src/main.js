import Vue from 'vue';
import VueDraggableResizable from 'vue-draggable-resizable';
import App from './App.vue';

// optionally import default styles
import 'vue-draggable-resizable/dist/VueDraggableResizable.css';

Vue.component('vue-draggable-resizable', VueDraggableResizable);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App)
}).$mount('#app');
