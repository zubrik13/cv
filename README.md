# CV
[![Build Status](https://travis-ci.com/zubrik13/cv.svg?branch=master)](https://travis-ci.com/github/zubrik13/cv)

Static CV generated from the Yaml data file and a template.

## How to update

- Run `run.sh` script in the root folder of the repository, it starts SimpleHTTPServer to serve the content of this directory
- Run `npm run watch` in order to recompile the template and keep updating as you change modify data or template
- Make necessary updates in `./src` folder
- Push to master and Github Actions will render template and deploy it to `gh-pages` branch automatically
