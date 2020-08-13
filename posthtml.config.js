module.exports = {
    plugins: {
        'posthtml-expressions': {
            locals: {
                NODE_ENV: process.env.NODE_ENV,
                SERVICE_WORKER: '/service-worker.js',
            },
        },
    },
};
