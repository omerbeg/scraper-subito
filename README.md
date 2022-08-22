# Node.js scrapper for subito.it
#### Specialized version
 
This project is a Node.js piece of software which fetches classified ads from the subito.it website and stores them in structured way for further use.

The entire project, its setup and its use is covered on the sections below.

---

### Table of contents

1. [Prerequisites](#prerequisites)
2. [Download / clone the repository](#download--clone-the-repository)
3. [Installation](#installation)
4. [Commands](#commands)
   1. [Single ad fetch by url](#single-ad-fetch-by-url)
   2. [ Massive ad fetch by url and pages](#massive-ad-fetch-by-url-and-pages)
5. [Further development](#further-development)
6. [Changelog](#changelog)
---

### Prerequisites

This project requires Node.js and few extensions for it to work. In order to proceed, you need to install `node` and `npm` (Ubuntu example):

```shell
$ sudo apt update
$ sudo apt install nodejs
```

Check your `node` version with:

```shell
$ node -v
```

And you should receive an output similar to this:

```shell
v12.22.1
```

It's important that your `node` version is higher or equal to version 12.

If you need to add your custom Debian/Ubuntu PPA, please refer to [this article](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04).

The aforementioned article also covers the `nvm` - the _node version manager_ - with which you can quickly and interactively change the `node` version as per your specific needs.

---

### Download / clone the repository

First, you need to clone the repository on your machine with the following command:

```shell
$ git clone git@github.com:oglasi-com/scraper-klikdooglasa.git
```
When you have cloned the project, to update changes, it's best to rebase the entire branch on your machine with the following:

```shell
$ git fetch --all
$ git rebase origin/main
$ git pull                # Just to confirm that we're 'Already up-to-date.'-message.
```

This way if someone else pushes to the `main` branch, we'll be on the same track and won't interfere each other trees.

Otherwise, you can just issue the following deployment command which comes with the project:

```shell
$ ./deploy.sh
```

Which will do exactly same as the `git` block of commands up above.

---

### Installation

To run this software, you need to have following `node` packages installed:

```json
{
  "cheerio": "^1.0.0-rc.12",
  "objects-to-csv": "^1.3.6",
  "puppeteer": "^16.2.0",
  "xml2js": "^0.4.23",
  "commander": "^9.4.0"
}
```

When you have installed `node` / `npm` on your machine, you can
proceed with installing these dependencies for this project by
issuing the following command in your terminal:

```shell
$ npm install
```
This will install all the dependencies.


---

### Commands

This software accepts the following commands

```shell
$ node index.js -u <url> -p <number of pages to scrape>
# Fetches all the listings for specified category and for number of pages, saves the result in csv files (one cvs file per page).
```

```shell
$ node scrapeListing -u <url>
# Fetches specific listing from the website
```

#### Singe ad fetch by url

```shell
$ node scrapeListing -u <url>
# Fetches a single ad by their url
```

#### Massive ad fetch by url and pages

```shell
$ node index.js -u <url> -p <number of pages>
# Fetches all the links from the specific url, fetches the pagination, goes over all the urls for specific pages and saves the result in csv files.

### Changelog

