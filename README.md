h1. Angular and gulp project bootstrap
A simple and flexible gulp / angular bootstrap to get you quickly up running with a new project.
No constraints in how you choose to orgnanize your code nor what other deps to include.

Set up with a simple gulp webserver to host your webproject and proxy your backend API calls to another server. Easily modify the gulpfile middlewere to suit your backend needs or customize with e.g. NodeJS .


h2. Getting started
 * npm install
 * bower install
 * gulp


h2. Build local for development
 * gulp 
h3. Build for production (minimize and prepare dist folder)
 * gulp build-dist

h3. Use the built-in webserver:
 * gulp connect
 * Open your browser on localhost:1984
 * Initially set up to proxy traffic coming to /webresources/ to another server (see gulpfile.js)