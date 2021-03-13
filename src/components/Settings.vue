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
                <v-list-item v-for="n in 30" :key="n">
                    <v-list-item-content>
                        <v-list-item-title>Bookmark</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list three-line subheader>
                <v-list-item>
                    <v-list-item-content>
                        <v-btn color="primary">
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
import {ModelSync} from 'vue-property-decorator';

@Component
export default class Settings extends Vue {
    @ModelSync('value', 'change', {type: Boolean})
    open!: boolean;
}
</script>
