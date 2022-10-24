const {resolve} = require('path');

export default {
    build: {
        rollupOptions: {
            input: {
                home: resolve(__dirname, 'index.html'),
                signUp: resolve(__dirname, 'signup.html'),
                logIn: resolve(__dirname, 'login.html'),
                loader: resolve(__dirname, 'loader.html'),
                profile: resolve(__dirname, 'profile.html'),
                
            },
        },
    },
};