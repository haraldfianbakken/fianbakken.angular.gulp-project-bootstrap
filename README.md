# Angular and gulp project bootstrap
A simple and flexible gulp / angular bootstrap to get you quickly up running with a new project.
No constraints in how you choose to orgnanize your code nor what other deps to include.

Set up with a simple gulp webserver to host your webproject and proxy your backend API calls to another server. Easily modify the gulpfile middlewere to suit your backend needs or customize with e.g. NodeJS .

## The setup
 * Angular
 * Gulp (bower / node)
 * Karma , Mocha, Chai-mocha
 * UI-router
 * Sass compilation
 * Minification, obscurification
 * Jshint
 * Webserver with backend proxies
 * Predfined abstracts states, routing , error handling and more for starter template for your project to customize.
 * Flexible folder-structure (basically put stuff in any way you want within src/


## Getting started
 * npm install
 * bower install
 * gulp
 * gulp conncet (starts webserver on localhost:1984)

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

