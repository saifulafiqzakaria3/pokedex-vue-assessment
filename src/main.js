import App from './App.vue'
import { createApp } from 'vue';
import store from './store/index.js';
import router  from './router'

import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseBadge from './components/ui/BaseBadge.vue';
import installElementPlus from './plugins/element'

// const store = createStore({
//     state() {
//         return {
//             index: 0
//         };
//     },
//     mutations: {
//         increment(state) {   
//             state.index = state.index + 2;
//         },
//         increase(state, payload) {
//             state.index = state.index + payload;
//         }
//     },
//     //getting data, so that we no need to directly access the state
//     getters: {
//         finalIndex(state) {
//             return state.index;
//         }
//     }
// });


const app = createApp(App)
app.use(router)
app.use(store)
app.use(installElementPlus)

app.component('base-card', BaseCard)
app.component('base-button', BaseButton)
app.component('base-badge', BaseBadge)

app.mount('#app')
