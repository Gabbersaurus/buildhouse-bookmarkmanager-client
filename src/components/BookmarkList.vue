<template>
    <v-main>
        <v-container>
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
                    <v-col
                        v-for="bookmark in bookmarks"
                        :key="bookmark.id"
                        cols="3"
                        class="d-flex align-center"
                    >
                        <v-btn
                            height="100%"
                            class="pa-1 ma-auto"
                            @click="settings = true"
                        >
                            <div
                                class="d-flex flex-column align-center justify-space-between"
                            >
                                <v-img
                                    src="https://github.githubassets.com/app-icon-192.png"
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
import ClientContainer from '@/graphQL/ClientContainer';
import {Bookmarks} from '@/graphQL/queries';
import Vue from 'vue';
import Component from 'vue-class-component';
import Settings from './Settings.vue';
import Bookmark from '@/types/Bookmark';

@Component({
    components: {Settings},
})
export default class BookmarkList extends Vue {
    settings = false;
    bookmarks: Bookmark[] = [];

    mounted() {
        void this.loadBookmarks();
    }

    async loadBookmarks() {
        //Todo: loading spinner

        if (ClientContainer.client) {
            const result = await ClientContainer.client.query({
                query: Bookmarks,
            });

            this.bookmarks = result.data.bookmarks as Bookmark[];
        }
    }
}
</script>
