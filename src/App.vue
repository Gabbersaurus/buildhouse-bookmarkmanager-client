<template>
    <v-app>
        <v-progress-circular
            v-if="loading"
            indeterminate
            style="height: 100%"
            class="align-self-center"
            color="primary"
        />
        <login
            v-else-if="!authenticated"
            @authenticated="authenticated = true"
        />
        <bookmark-list v-else />
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import BookmarkList from './components/BookmarkList.vue';
import Login from './components/Login.vue';
import ClientContainer from './graphQL/ClientContainer';

@Component({
    components: {Login, BookmarkList},
})
export default class App extends Vue {
    loading = true;
    authenticated = false;

    mounted() {
        void this.connectFromPrevious();
    }

    async connectFromPrevious() {
        this.loading = true;

        if (await ClientContainer.ConnectFromPrevious()) {
            this.authenticated = true;
        }

        this.loading = false;
    }
}
</script>
