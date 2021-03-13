<template>
    <v-app>
        <v-main>
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
                        v-for="n in 30"
                        :key="n"
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
                                    Github
                                </div>
                            </div>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Settings from './components/Settings.vue';

@Component({
    components: {Settings},
})
export default class App extends Vue {
    settings = false;
}
</script>
