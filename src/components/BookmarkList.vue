<template>
    <v-main>
        <v-container>
            <v-overlay :value="loading">
                <v-progress-circular
                    indeterminate
                    color="primary"
                ></v-progress-circular>
            </v-overlay>

            <div class="d-flex pa-4 align-center">
                <div class="text-overline">Buildhouse Bookmark Manager</div>
                <v-spacer />
                <v-btn icon @click="settings = true">
                    <v-icon>mdi-cog</v-icon>
                </v-btn>
            </div>

            <settings v-model="settings" />

            <v-container>
                <v-row>
                    <search-bar />
                </v-row>
                <v-row>
                    <v-col
                        v-for="bookmark in bookmarks"
                        :key="bookmark.id"
                        cols="3"
                        class="d-flex pa-1 align-center"
                    >
                        <v-btn
                            height="100%"
                            class="pa-1 ma-auto"
                            :href="bookmark.url"
                            target="_blank"
                        >
                            <div
                                class="d-flex flex-column align-center justify-space-between"
                            >
                                <v-img
                                    :src="bookmark.favicon"
                                    height="72px"
                                    width="72px"
                                    :aspect="1"
                                ></v-img>
                                <div
                                    style="max-width: 72px;"
                                    class="text-caption text-none  text-truncate"
                                >
                                    {{ bookmark.name }}
                                </div>
                            </div>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-container>
    </v-main>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {mapState} from 'vuex';
import Settings from './Settings.vue';
import SearchBar from './SearchBar.vue';

@Component({
    components: {Settings, SearchBar},
    computed: mapState(['bookmarks']),
})
export default class BookmarkList extends Vue {
    settings = false;
    loading = true;

    mounted() {
        void this.loadBookmarks();
    }

    async loadBookmarks() {
        this.loading = true;

        await this.$store.dispatch('loadBookmarks');

        //Clean old favicons

        this.loading = false;
    }
}
</script>
