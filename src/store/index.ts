import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        authenticated: false,
    },
    mutations: {
        authenticate(state, value) {
            state.authenticated = value;
        },
    },
    actions: {},
    modules: {},
});
