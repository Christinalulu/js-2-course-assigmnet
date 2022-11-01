const {resolve, dirname} = require('path');

export default {
    build: {
        rollupOptions: {
            input: {
                welcome: resolve(__dirname, 'welcome.html'),
                home: resolve(__dirname, 'index.html'),
                logIn: resolve(__dirname, 'login.html'),
                signUp: resolve(__dirname, 'signup.html'),
                profile: resolve(__dirname, 'profile.html'),
               
            },
        },
    },
};