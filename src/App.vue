<template>
    <v-app>
        <v-progress-circular
            v-if="loading"
            indeterminate
            style="height: 100%"
            class="align-self-center"
            color="primary"
        />
        <login v-else-if="!authenticated" />
        <bookmark-list v-else />
    </v-app>
</template>

<style lang="scss">
.v-data-table-header-mobile {
    display: none;
}
</style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {mapState} from 'vuex';
import BookmarkList from './components/BookmarkList.vue';
import Login from './components/Login.vue';
import ClientContainer from './graphQL/ClientContainer';

@Component({
    components: {Login, BookmarkList},
    computed: mapState(['authenticated']),
})
export default class App extends Vue {
    loading = true;

    mounted() {
        void this.connectFromPrevious();
    }

    async connectFromPrevious() {
        this.loading = true;

        await ClientContainer.ConnectFromPrevious();

        this.loading = false;
    }
}
</script>
