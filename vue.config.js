module.exports = {
    transpileDependencies: ['vuetify'],
    pwa: {
        name: 'BBM',
        manifestOptions: {
            description: 'Buildhouse Bookmark Manager',
            background_color: '#00796B',
            icons: [
                {
                    src: 'img/icons/app-192x192.png',
                    type: 'image/png',
                    sizes: '192x192',
                },
                {
                    src: 'img/icons/app-512x512.png',
                    type: 'image/png',
                    sizes: '512x512',
                },
            ],
        },
        themeColor: '#00796B',
        msTileColor: '#00796B',
        iconPaths: {
            favicon32: 'img/icons/favicon-32x32.png',
            favicon16: 'img/icons/favicon-16x16.png',
            appleTouchIcon: 'img/icons/apple-touch-icon.png',
            maskIcon: 'img/icons/safari-pinned-tab.svg',
            msTileImage: 'img/icons/mstile-150x150.png',
        },
    },
};
