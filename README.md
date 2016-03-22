# Angular and gulp project bootstrap
A simple and flexible gulp / angular bootstrap to get you quickly up running with a new project. No constraints in how you choose to orgnanize your code nor what other deps to include.
Create an easy to use project for live updating the "development" version that are easy to debug; whilst producting a "dist" build with minimized and obscurified code.

Auto-injects third-party dependencies and bundles this within your app when building the dist.

Set up with a simple gulp webserver to host your webproject and proxy your backend API calls to another server.

Easily modify the gulpfile middleware to suit your backend needs or customize with e.g. NodeJS .

## The setup
 * Angular
 * Gulp (bower / node)
 * Auto-inject bower dependencies (wiredep)
 * UI-router
 * Sass compilation (gulp-sass) with css-maps
 * Minification, obscurification (usemin, usemin-prepae)
 * Jshint (enforce some js best practices).
 * Webserver with backend proxies
 * Predfined abstracts states, routing , error handling and more for starter template for your project to customize.
 * Flexible folder-structure (basically put stuff in any way you want within src/
 * Karma , Mocha, Chai-mocha, chai-promises, spy


## Getting started
 * npm install
 * bower install
 * gulp
 * gulp connect (starts webserver on localhost:1984)

###. You should consider:
 * Define an app-state (concrete, not abstract) that'll match your main-route (e.g. /). Now it's rendering index.html with the abstract state when starting up.
 ..** Base the state on app or app.auth and give it a template.
 * Change the app-ids in the template (translations, templates and web) to your app-name
 * Install some css/sass framework (like bootstrap)
 * Remove the help-texts from index.html


### Use the built-in webserver:
 * gulp connect
 * Open your browser on localhost:1984
 * Initially set up to proxy traffic coming to /webresources/ to another server (see gulpfile.js)

