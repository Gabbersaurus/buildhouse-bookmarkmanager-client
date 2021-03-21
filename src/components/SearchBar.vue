<template>
    <v-row>
        <v-col cols="8">
            <v-text-field
                label="Search the internet"
                v-model="query"
            ></v-text-field>
        </v-col>
        <v-col cols="4" class="d-flex align-center justify-center">
            <v-btn
                :disabled="query.length <= 0"
                :href="queryUrl"
                target="_blank"
                color="primary"
                block
            >
                Search
            </v-btn>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import {getSearchProviderQueryURL} from '@/helpers/searchProviders';
import SearchProvider from '@/types/SearchProvider';
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Searchbar extends Vue {
    query = '';

    get queryUrl() {
        return (
            getSearchProviderQueryURL(
                this.$store.state.searchProvider as SearchProvider,
            ) + this.query
        );
    }
}
</script>
