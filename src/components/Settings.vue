<template>
    <v-dialog
        :value="open"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
    >
        <v-card>
            <v-overlay :value="loading">
                <v-progress-circular
                    indeterminate
                    color="primary"
                ></v-progress-circular>
            </v-overlay>
            <v-toolbar dark color="primary">
                <v-btn icon dark @click="open = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Settings</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark text @click="save">
                        Save
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-list three-line subheader>
                <v-subheader>Bookmarks</v-subheader>
                <v-list-item v-if="error">
                    <v-alert class="ma-auto" type="error">
                        {{ error }}
                    </v-alert>
                </v-list-item>
                <v-list-item>
                    <v-data-table
                        :headers="bookmarkHeaders"
                        :items="bookmarks"
                        :items-per-page="-1"
                        item-key="id"
                        sort-by="order"
                        style="width: 100%"
                        hide-default-footer
                        disable-pagination
                        disable-filtering
                        fixed-header
                    >
                        <template v-slot:item.actions="{item}">
                            <v-icon
                                class="mr-8"
                                @click="setBookmarkOrder(item, -1)"
                            >
                                mdi-arrow-up
                            </v-icon>
                            <v-icon
                                class="mr-8"
                                @click="setBookmarkOrder(item, 1)"
                            >
                                mdi-arrow-down
                            </v-icon>
                            <v-icon @click="deleteBookmark(item)">
                                mdi-delete
                            </v-icon>
                        </template>
                        <template v-slot:item.name="props">
                            <v-edit-dialog
                                :return-value.sync="props.item.name"
                                large
                            >
                                <div>{{ props.item.name }}</div>
                                <template v-slot:input>
                                    <div class="mt-4 title">
                                        Update name
                                    </div>
                                    <v-text-field
                                        v-model="props.item.name"
                                        label="Edit"
                                        single-line
                                        counter
                                        autofocus
                                    ></v-text-field>
                                </template>
                            </v-edit-dialog>
                        </template>
                        <template v-slot:item.url="props">
                            <v-edit-dialog
                                :return-value.sync="props.item.url"
                                large
                            >
                                <div>{{ props.item.url }}</div>
                                <template v-slot:input>
                                    <div class="mt-4 title">
                                        Update URL
                                    </div>
                                    <v-text-field
                                        v-model="props.item.url"
                                        label="Edit"
                                        single-line
                                        counter
                                        autofocus
                                    ></v-text-field>
                                </template>
                            </v-edit-dialog>
                        </template>
                    </v-data-table>
                </v-list-item>
                <v-list-item>
                    <v-btn color="primary" block @click="addBookmark">
                        Add bookmark
                    </v-btn>
                </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list three-line subheader>
                <v-list-item>
                    <v-list-item-content>
                        <v-btn color="secondary" @click="logOut">
                            Log out
                        </v-btn>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {ModelSync, Watch} from 'vue-property-decorator';
import ClientContainer from '@/graphQL/ClientContainer';
import Bookmark from '@/types/Bookmark';
import {SetBookmarks} from '@/graphQL/mutations';

@Component
export default class Settings extends Vue {
    bookmarks: Bookmark[] = [];
    bookmarkHeaders = [
        {
            text: 'Name',
            value: 'name',
        },
        {text: 'URL', value: 'url'},
        {text: 'Actions', value: 'actions'},
    ];

    @ModelSync('value', 'change', {type: Boolean})
    open!: boolean;

    loading = false;
    error = '';
    idCount = 0;

    @Watch('open')
    onOpenChanged() {
        let i = 0;

        //Clone bookmarks and recount order so there are no gaps
        this.bookmarks = (JSON.parse(
            JSON.stringify(this.$store.state.bookmarks),
        ) as Bookmark[]).map((bookmark) => {
            return {
                ...bookmark,
                order: i++,
            };
        });
    }

    addBookmark() {
        this.bookmarks = [
            ...this.bookmarks,
            {
                id: -++this.idCount,
                name: 'New bookmark',
                url: 'https://bookmark',
                order:
                    this.bookmarks.reduce((accumulator, current) =>
                        accumulator.order > current.order
                            ? accumulator
                            : current,
                    ).order + 1,
            },
        ];
    }

    setBookmarkOrder(bookmarkToOrder: Bookmark, add: number) {
        const newOrder = bookmarkToOrder.order + add;

        for (const bookmark of this.bookmarks) {
            if (bookmark.order == newOrder) {
                bookmark.order -= add;
            }
        }

        bookmarkToOrder.order = newOrder;
    }

    deleteBookmark(bookmarkToDelete: Bookmark) {
        this.bookmarks = this.bookmarks.filter(
            (bookmark) => bookmark.id != bookmarkToDelete.id,
        );
    }

    async save() {
        this.error = '';
        this.loading = true;

        try {
            await ClientContainer.client?.mutate({
                mutation: SetBookmarks,
                variables: {
                    bookmarks: this.bookmarks.map((bookmark) => {
                        return {
                            id: bookmark.id,
                            name: bookmark.name,
                            url: bookmark.url,
                            order: bookmark.order,
                        };
                    }),
                },
            });
        } catch (error) {
            console.error(error);

            this.error = 'Could not update bookmarks';
            this.loading = false;

            return;
        }

        await this.$store.dispatch('loadBookmarks');
        this.onOpenChanged(); //Reload list
        this.loading = false;
    }

    logOut() {
        ClientContainer.ClearStoredAuthentication();
        this.$store.commit('authenticate', false);
    }
}
</script>
