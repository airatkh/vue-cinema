import Vue from 'vue';
import './style.scss';
import VueResource from 'vue-resource';
import Overview from './components/Overview.vue';
import VueRouter from 'vue-router';
import routes from './util/routes';

Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({routes});

import moment from 'moment-timezone';
moment.tz.setDefault('UTC');
Object.defineProperty(Vue.prototype, '$moment', { get() {return this.$root.moment} });

import {checkFilter, setDay} from './util/bus';
const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', { get() {return this.$root.bus} });

import Tooltip from './util/tooltip';
Vue.use(Tooltip);

new Vue({
    el: "#app",
    data: {
        genre: [],
        time: [],
        movies:[],
        moment,
        day: moment(),
        bus
    },
    components: {
        Overview
    },
    router,
    created(){
        this.$http.get('/api').then((responce) =>{
            this.movies = responce.data;
        });
        this.$bus.$on('check-filter', checkFilter.bind(this));
        this.$bus.$on('set-day', setDay.bind(this));
    }
});