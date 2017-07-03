System.config({
    transpiler: 'plugin-babel',
    map: {
        // System.js files
        'plugin-babel': 'node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': 'node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',

        // App files
        'app': 'js/app.js',
        'requester': 'js/requester.js',
        'templates': 'js/templates.js',
        'data': 'js/data.js',
        'user': 'js/user.js',
        'constants': 'js/helpers/constants.js',
        'validator': 'js/helpers/validator.js',
        'facebookHelper': 'js/helpers/facebookHelper.js',

        // Controllers
        'homeController': 'js/controllers/homeController.js',
        'invalidController': 'js/controllers/invalidController.js',
        'signInController': 'js/controllers/signInController.js',
        'registerController': 'js/controllers/registerController.js',
        'userController': 'js/controllers/userController.js',
        'currentUserController': 'js/controllers/currentUserController.js',
        'shareController': 'js/controllers/shareUserController.js',
        'currentUserCollectionsController': 'js/controllers/currentUserCollectionsController.js',
        'createNewCollectionController': 'js/controllers/createNewCollectionController.js',
        'collectionManageController': 'js/controllers/collectionManageController.js',
        'viewItemsController': 'js/controllers/viewItemsController.js',

        // Library files
        'jquery': 'node_modules/jquery/dist/jquery.min.js',
        'navigo': 'node_modules/navigo/lib/navigo.min.js',
        'handlebars': 'node_modules/handlebars/dist/handlebars.min.js',


        // Firebase
        'firebase': 'node_modules/firebase/firebase.js',
        'firebaseConfig': 'js/configs/firebase-config.js',
    },
});

System.import('app');
