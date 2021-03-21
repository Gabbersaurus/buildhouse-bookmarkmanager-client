import SearchProvider from '@/types/SearchProvider';

const getSearchProviders = () => {
    const searchProviders: string[] = [];

    for (const searchProvider in SearchProvider) {
        searchProviders.push(searchProvider);
    }

    return searchProviders;
};

const getSearchProviderQueryURL = (searchProvider: SearchProvider) => {
    switch (searchProvider) {
        case SearchProvider.Google:
            return 'https://www.google.com/search?&q=';
        case SearchProvider.Ecosia:
            return 'https://www.ecosia.org/search?q=';
        case SearchProvider.Bing:
            return 'https://www.bing.com/search?q=';
        default:
            return 'https://duckduckgo.com/?q=';
    }
};

export {getSearchProviders, getSearchProviderQueryURL};
