// const express = require('express'); for common js modules 


import express from 'express';
//importing express into the server 
// const path = require('path'); fpr common js modules

import path from 'path';
//module that provides utilities for working with file paths

import { fileURLToPath } from 'url';
// const posts = require('./routes/post') common js modules

import posts from './routes/post.js'
//imports the other routes

import logger from './middleware/logger.js'
//imports the middleware named logger

import errorHandler from './middleware/error.js';
//imports the middleware error handler 

import notFound from './middleware/notFound.js';
//not found middleware 

const port = process.env.PORT || 8000;
//get the port from the environment variables and if the process.env.PORT is not set it set port 8000 as the default

//get the current file and directory name  directory name 
const __filename = fileURLToPath(import.meta.url);
//fileURLToPath is used to convert the file Url to the local path. 
//import.meta.urlprovides the url of the current module
const __dirname = path.dirname(__filename)
//it creates a dirname with the path 


const app = express();
//Creates an express app

app.use(express.static(path.join(__dirname, 'public')))
//it will serve static files from a 'public' folder 

//body parser middleware 
app.use(express.json());//being able to submit raw json
app.use(express.urlencoded({ extended: false }));
//Logger Midlleware
app.use(logger)

//Routes
app.use('/api/posts', posts)

//catch all errors
app.use(notFound);
//Error Handler
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
//Starts the server on the specified port and logs a message to the console.