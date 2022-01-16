# My Media Library

*REST API executed using Express, Node.js, PostgreSQL, Knex.js*

<div>
<img alt="Front-end example" src="https://github.com/Gabe-Goodman/My-Media-Library/blob/972aa4505e37edb63f2e0275af9beac0813da17a/screenshots/frontend.png" width="300" />  <div> <img alt="Book results snippet" src="https://github.com/Gabe-Goodman/My-Media-Library/blob/972aa4505e37edb63f2e0275af9beac0813da17a/screenshots/books.png" height="200" />

<img alt="Movie results snippet" src="https://github.com/Gabe-Goodman/My-Media-Library/blob/972aa4505e37edb63f2e0275af9beac0813da17a/screenshots/movies.png" height="200" />
</div>
</div>

## Backend

- **Knex.js** to establish the connection to the database
- **PostgreSQL** for database
- **Express** to create local server
- **Express.static( )** to host static web pages frontend
    
    ### Endpoints
    
    Retrieve media by type
    
    - **/media-library/movies**
    - **/media-library/books**
    - **/media-library/albums**
    
    CRUD functionality
    
    - **/add-media ———** **C**reate new media entry
    - **/find-media ———** **R**ead new media entry
    - **/update-media  — U**pdate media entry
    - **/remove-media — D**elete media entry

## Frontend

- **Static web pages** served using Express.static( )
- **Form inputs** serve as query parameters (see resulting URL)
- Only **POST, GET** requests are able to be sent from an HTML form element

## Installation

Clone the app from github and (on node) run `npm install` to install the required dependencies.

Create a local PostgreSQL database “my_media_library”.

You will need to configure the connection in knexfile.js at the project root.

`module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'my_media_library',
      user: 'username',
      password: 'password',
    },
    seeds: {
      directory: './knex/seeds',
    },
    migrations: {
      directory: './knex/migrations',
    },
  },
};`

<img alt="Knexfile.js" src="https://github.com/Gabe-Goodman/My-Media-Library/blob/972aa4505e37edb63f2e0275af9beac0813da17a/screenshots/knexfile.png" height="200" />

### **Scripts**

`knex seed:run` seeds database

`knex migrate:latest` runs knex migrations

`npm run start` starts the backend server and seeds migrations, frontend available on http://localhost:3000/

Recommended: [JSONVue](https://chrome.google.com/webstore/detail/jsonvue/chklaanhfefbnpoihckbnefhakgolnmc) or other JSON formatting extension
