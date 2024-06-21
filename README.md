
# Portfolio for Job Applications

If you have arrived here, you are probably going through my application and considering whether you should invite me. If you take the trouble to read this readme, you seem to be doing a really good job, respect! I would love to have such a hard-working colleague, so why don't you invite me and convince yourself that I fit in :)

If you are here to install this app, just follow this guide.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

During development, apps are usually served via HTTP. But Storyblok v2 requires your app is served via HTTPS. Therefore, you must first install `mkcert` to generate local SSL certificates.
#### For Linux & MacOs users
**Install mkcert for creating a valid certificate and Install localhost with mkcert:**  
Open your terminal and run the commands below consecutively; make sure you have homebrew installed first.
```
brew install mkcert
mkcert -install
mkcert localhost
```
**Install the HTTPS proxy and run the proxy with the commands below:**  
You need to have Node and NPM installed for this work.

```
npm install -g local-ssl-proxy // Installing the proxy
local-ssl-proxy --source 3010 --target 3000 --cert localhost.pem --key localhost-key.pem  // Running the proxy to target port 3000, you can change that any port of your choice but it should be what your app is running on in development.
```
HTTPS is now running on port 3010 and forwarding requests to http 3000.

#### For Windows users
**Install Chocolatey:**  
A package manager for windows. You can view installation guides [here](https://chocolatey.org/).

**Install mkcert for creating a valid certificate and install localhost with mkcert:**  
Open your terminal as admin and run the commands below consecutively; make sure that Chocolatey is installed first.

```
choco install mkcert // install mkcert
mkcert --version // check the mkcert version
```
**Run the proxy with the command below:** 
```
yarn proxy
```

### Installing

To get the application running, install all packages 

```
yarn install
```

and run the dev server.

```
yarn dev
```

**Setup the .env:**  
Copy the contents of `.env.sample` to `.env` and change the values. You will need to put at least a token to the `STORYBLOK_PREVIEW_TOKEN` variable. The default settings are:

```
STORYBLOK_TOKEN  =  ''  							# add your production token here
STORYBLOK_PREVIEW_TOKEN  =  ''  					# add your preview token here
NODE_ENV  =  'development'  						# | change to "production" when deploying
BASE_URL  =  ''  									# https://your_website.com
SEO_TITLE  =  ''  									# title of the website
SEO_DESCRIPTION  =  ''  							# description of the website
SEO_BANNER_REL_PATH  =  '/seo/standard-banner.jpg'  # place in public folder
```

## Deployment

To deploy the application to a live server, change the `NODE_ENV` to `production` and run `yarn generate`.

Copy the contents of `.output/public/` to your server.

## Built With

* [Nuxt.js](https://nuxt.com/) - *The Web Framework used*
* [TaildwindCSS](https://tailwindcss.com/) - *The CSS Framework used*
* [Storyblok](https://www.storyblok.com/) - *The Content Management System used*
* [Anime.js](https://animejs.com/) - *Used for Javascript Animations*

## Contributing

This project is not intended to be contributed to.

## Authors

* **Niklas Wingender** - [GitHub](https://github.com/nikwins)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Inspiration for the Page Transition by [Codrops](https://tympanus.net/codrops/)
