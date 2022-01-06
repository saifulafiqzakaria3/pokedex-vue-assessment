import { createWebHistory, createRouter } from "vue-router";

//pages
// import HelloWorld from './components/HelloWorld.vue';
import PokemonsList from './pages/Pokemons/PokemonsList.vue';
import PokemonDetail from './pages/Pokemons/PokemonDetail.vue';
import FavoritesList from './pages/Pokemons/FavoritesList.vue';
import NotFound from './pages/NotFound.vue';



const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/homepage'},
        { path: '/homepage', component: PokemonsList},
        { path: '/homepage/:id', component: PokemonDetail, props: true},
        { path: '/favorites', component: FavoritesList},
        { path: '/:notFound(.*)', component: NotFound },
    ],
});

router.beforeEach((to, from, next) => {
    // console.log(to, from)
    // next(false) //or can disable navigation
    // next('/users')   //can set to any url
    //check meta from route
    // if(to.meta.needsAuth) {
        // console.log('Needs auth')
    // } 
    next();
})

export default router;