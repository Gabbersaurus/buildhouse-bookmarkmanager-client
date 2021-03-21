import ClientContainer from '@/graphQL/ClientContainer';
import {Bookmarks} from '@/graphQL/queries';
import Bookmark from '@/types/Bookmark';
import SearchProvider from '@/types/SearchProvider';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const searchProviderLocalStorageKey = 'search-provider';

export default new Vuex.Store({
    state: {
        authenticated: false,
        bookmarks: [] as Bookmark[],
        searchProvider:
            localStorage.getItem(searchProviderLocalStorageKey) ??
            SearchProvider.DuckDuckGo.toString(),
    },
    mutations: {
        authenticate(state, value) {
            state.authenticated = value;
        },
        setBookmarks(state, bookmarks) {
            state.bookmarks = bookmarks;
        },
        setSearchProvider(state, searchProvider) {
            localStorage.setItem(searchProviderLocalStorageKey, searchProvider);
            state.searchProvider = searchProvider;
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
