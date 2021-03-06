Real-time Chat Application
=========================================

Both server and client side are written using `TypeScript`.

# Running Server and Client locally
## Requirements

Ensure you have the following installed:

1. Node.js - Download and Install latest version of Node: [NodeJS](https://nodejs.org)
2. Angular CLI - Install Command Line Interface for Angular [Angular CLI](https://cli.angular.io/)

## Run Server

Copy **.env.example** file into **.env** and change enviroment variables

To run server locally in terminal:

```bash
$ cd server
$ npm i -g gulp-cli
$ npm i
$ npm run-script build
$ npm start
```

Server defaults to run on port `8080`

## Run Angular Client

Open other terminal and run following:

```bash
$ cd client
$ npm i
$ ng serve
```

Now open your browser in following URL: [http://localhost:4200](http://localhost:4200/)