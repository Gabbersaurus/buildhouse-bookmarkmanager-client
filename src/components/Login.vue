<template>
    <v-main>
        <v-form v-model="valid">
            <v-container>
                <v-row justify="center">
                    <v-col cols="12" md="4">
                        <div class="text-overline text-center">
                            Buildhouse Bookmark Manager
                        </div>
                        <v-text-field
                            v-model="server"
                            :disabled="loading"
                            :rules="serverRules"
                            label="Server"
                            required
                        ></v-text-field>

                        <v-text-field
                            v-model="username"
                            :disabled="loading"
                            :rules="usernameRules"
                            label="Username"
                            required
                        ></v-text-field>

                        <v-text-field
                            v-model="password"
                            :disabled="loading"
                            :rules="passwordRules"
                            label="Password"
                            type="password"
                            required
                        ></v-text-field>
                        <v-alert v-if="error" type="error">
                            {{ error }}
                        </v-alert>
                        <v-btn
                            :disabled="!valid"
                            :loading="loading"
                            block
                            color="primary"
                            @click="authenticate"
                            >Authenticate</v-btn
                        >
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </v-main>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {Emit} from 'vue-property-decorator';
import ClientContainer from '@/graphQL/ClientContainer';

@Component({
    components: {},
})
export default class Login extends Vue {
    valid = false;

    server = ClientContainer.previousServer;
    username = ClientContainer.previousUsername;
    password = '';

    serverRules = [(i: string) => !!i || 'Server is required'];
    usernameRules = [(i: string) => !!i || 'Username is required'];
    passwordRules = [(i: string) => !!i || 'Password is required'];

    loading = false;
    error = '';

    async authenticate(): Promise<void> {
        this.error = '';

        try {
            this.loading = true;

            await ClientContainer.Connect(
                this.server,
                this.username,
                this.password,
            );

            this.loading = false;

            this.authenticated();
        } catch (error) {
            this.loading = false;
            this.error = error.message;
        }
    }

    @Emit()
    authenticated() {
        return;
    }
}
</script>
