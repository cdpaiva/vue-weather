# vue-weather

## Description
Vue weather is an application created with Vue.js in which users can retrieve weather information for a particular city or country. The information includes the current temperature (in °C, °F or K) and the weather status. A corresponding image is presented according to the weather status and local time (night or day). 

## Tools used and concepts applied
This is a project to illustrate fetching resources from an external API, processing the responses received and displaying information based on those responses.
It uses Vue.js with the options API as the JS framework, axios as an HTTP client and Bulma as a CSS framework.
This project covers several interesting concepts, such as: handling promises, asynchronous API calls, error handling, data exchange between components and vue lifecycle hooks.

## Project setup
First, install all the required dependencies:
```
npm install
```

This application uses the [Open Weather API](https://openweathermap.org/api), that requires an API key. To properly use it, visit the website, create an account and get a key.
The key is acessed as a _custom environment variable_. To properly set the variable, use the corresponding command:

Linux, macOs:
```sh
VUE_APP_API_KEY=insert_your_key_here npm run serve
```
Windows(cmd.exe):
```sh
set "VUE_APP_API_KEY=insert_your_key_here" && npm run serve
```
Windows(Powershell)
```sh
($env:VUE_APP_API_KEY = "insert_your_key_here") -and (npm run serve)
```

Running the application directly, i.e. `npm run serve` will present the user a message to properly configure the key and will disable the search function.
