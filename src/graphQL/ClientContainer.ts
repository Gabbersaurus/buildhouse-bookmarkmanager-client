import store from '@/store';
import StoredAuthentication from '@/types/StoredAuthentication';
import {
    ApolloClient,
    ApolloLink,
    createHttpLink,
    DefaultOptions,
    InMemoryCache,
    NormalizedCacheObject,
} from '@apollo/client/core';
import {setContext} from '@apollo/client/link/context';
import {Authenticate} from './mutations';
import {Authentication} from './queries';

class ClientContainer {
    private readonly LocalStorageKey = 'StoredAuthentication';
    private readonly DefaultOptions: DefaultOptions = {
        watchQuery: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'ignore',
        },
        query: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all',
        },
    };

    private _client:
        | ApolloClient<NormalizedCacheObject>
        | undefined = undefined;

    private _previousServer = '';
    private _previousUsername = '';

    public async Connect(
        server: string,
        username: string,
        password: string,
    ): Promise<void> {
        this._client = new ApolloClient({
            link: ClientContainer.CreateLink(server),
            cache: new InMemoryCache(),
            defaultOptions: this.DefaultOptions,
        });

        const result = await this._client.mutate({
            mutation: Authenticate,
            variables: {
                username,
                password,
            },
        });

        const token = result.data.authenticate.token as string;

        this._client?.setLink(ClientContainer.CreateLink(server, token));

        this.StoreAuthentication({
            server,
            username,
            token,
        });

        store.commit('authenticate', true);
    }

    public async ConnectFromPrevious(): Promise<void> {
        store.commit('authenticate', false);

        const storedAuthentication = JSON.parse(
            localStorage.getItem(this.LocalStorageKey) ?? '{}',
        ) as StoredAuthentication;

        if (storedAuthentication.server && storedAuthentication.username) {
            //Set values so they are prefilled in the login screen
            this._previousServer = storedAuthentication.server;
            this._previousUsername = storedAuthentication.username;

            if (storedAuthentication.token) {
                //Refresh token
                try {
                    this._client = new ApolloClient({
                        link: ClientContainer.CreateLink(
                            storedAuthentication.server,
                            storedAuthentication.token,
                        ),
                        cache: new InMemoryCache(),
                        defaultOptions: this.DefaultOptions,
                    });

                    const result = await this._client.query({
                        query: Authentication,
                    });

                    const newToken = result.data.authentication.token as string;

                    //Set token for future requests
                    this._client?.setLink(
                        ClientContainer.CreateLink(
                            storedAuthentication.server,
                            newToken,
                        ),
                    );

                    //Store new token
                    this.StoreAuthentication({
                        server: storedAuthentication.server,
                        username: storedAuthentication.username,
                        token: newToken,
                    });

                    //Authenticated!
                    store.commit('authenticate', true);
                } catch {}
            }
        }
    }

    private static CreateLink(server: string, token = ''): ApolloLink {
        const httpLink = createHttpLink({
            uri: `${server}/graphql`,
        });

        if (token) {
            return setContext((_, {headers}) => {
                return {
                    headers: {
                        ...headers,
                        authorization: token ? `Bearer ${token}` : '',
                    },
                };
            }).concat(httpLink);
        }

        return httpLink;
    }

    private StoreAuthentication(authentication: StoredAuthentication) {
        localStorage.setItem(
            this.LocalStorageKey,
            JSON.stringify(authentication),
        );
    }

    public ClearStoredAuthentication() {
        //Get stored
        const storedAuthentication = JSON.parse(
            localStorage.getItem(this.LocalStorageKey) ?? '{}',
        ) as StoredAuthentication;

        //Remove token from stored
        storedAuthentication.token = '';

        //Set previous values for login screen
        this._previousServer = storedAuthentication.server;
        this._previousUsername = storedAuthentication.username;

        //Set to localstorage
        localStorage.setItem(
            this.LocalStorageKey,
            JSON.stringify(storedAuthentication),
        );
    }

    get client(): ApolloClient<NormalizedCacheObject> | undefined {
        return this._client;
    }

    get previousServer(): string {
        return this._previousServer;
    }

    get previousUsername(): string {
        return this._previousUsername;
    }
}

export default new ClientContainer();
