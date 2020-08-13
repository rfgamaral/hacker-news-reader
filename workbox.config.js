module.exports = {
    globDirectory: './dist',
    globPatterns: [
        '**/*.{html,css,js,gif,jpg,png,svg,webp,ico,ttf,woff,woff2,eot,webmanifest,map,xml}',
    ],
    swDest: './dist/service-worker.js',
    clientsClaim: true,
    skipWaiting: true,
    runtimeCaching: [
        {
            urlPattern: new RegExp('https://hacker-news.firebaseio.com'),
            handler: 'NetworkFirst',
        },
    ],
};
