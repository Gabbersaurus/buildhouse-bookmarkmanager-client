import ClientContainer from '@/graphQL/ClientContainer';
import {Bookmarks} from '@/graphQL/queries';
import Bookmark from '@/types/Bookmark';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        authenticated: false,
        bookmarks: [] as Bookmark[],
    },
    mutations: {
        authenticate(state, value) {
            state.authenticated = value;
        },
        setBookmarks(state, bookmarks) {
            state.bookmarks = bookmarks;
        },
    },
    actions: {
        async loadBookmarks(context) {
            if (ClientContainer.client) {
                const result = await ClientContainer.client.query({
                    query: Bookmarks,
                });

                context.commit(
                    'setBookmarks',
                    result.data.bookmarks.sort(function(
                        a: Bookmark,
                        b: Bookmark,
                    ) {
                        return a.order - b.order;
                    }) as Bookmark[],
                );
            }
        },
    },
    modules: {},
});
