<template>
    <v-dialog
        :value="open"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
    >
        <v-card>
            <v-toolbar dark color="primary">
                <v-btn icon dark @click="open = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Settings</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark text @click="open = false">
                        Save
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-list three-line subheader>
                <v-subheader>Bookmarks</v-subheader>
                <v-list-item>
                    <v-data-table
                        :headers="bookmarkHeaders"
                        :items="bookmarks"
                        :items-per-page="-1"
                        item-key="id"
                        style="width: 100%"
                        hide-default-footer
                        disable-sort
                        disable-pagination
                        disable-filtering
                        fixed-header
                    >
                        <template v-slot:item.name="props">
                            <v-edit-dialog
                                :return-value.sync="props.item.name"
                                large
                                @save="save"
                                @cancel="cancel"
                                @open="open"
                                @close="close"
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
                                @save="save"
                                @cancel="cancel"
                                @open="open"
                                @close="close"
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
            </v-list>
            <v-divider></v-divider>
            <v-list three-line subheader>
                <v-list-item>
                    <v-list-item-content>
                        <v-btn color="primary" @click="logOut">
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

@Component
export default class Settings extends Vue {
    bookmarks: Bookmark[] = [];
    bookmarkHeaders = [
        {
            text: 'Name',
            value: 'name',
        },
        {text: 'URL', value: 'url'},
    ];

    @ModelSync('value', 'change', {type: Boolean})
    open!: boolean;

    @Watch('open')
    onOpenChanged() {
        this.bookmarks = this.$store.state.bookmarks;
    }

    logOut() {
        ClientContainer.ClearStoredAuthentication();
        this.$store.commit('authenticate', false);
    }
}
</script>
