# My Media Library

---

*REST API executed using Express, Node.js, PostgreSQL, Knex.js*

<img src="https://github.com/Gabe-Goodman/My-Media-Library/blob/972aa4505e37edb63f2e0275af9beac0813da17a/screenshots/books.png" width="200" />
![Front-end example](https://github.com/Gabe-Goodman/My-Media-Library/blob/972aa4505e37edb63f2e0275af9beac0813da17a/screenshots/books.png)

![Movies results]()

![Books results]()

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

# Try It Out

---

Clone the app from github and (on node) run `npm install` to install the required dependencies.

Create a local PostgreSQL database “my_media_library”.

You will need to configure the connection in knexfile.js at the project root.

![Knexfile.js]()

### **Back end scripts**

You may wish to run these in a separate terminal from the back end scripts during development

`knex seed:run` seeds database

`knex migrate:latest` runs knex migrations

`npm start` starts the backend server and seeds migrations

Recommended: [JSONVue](https://chrome.google.com/webstore/detail/jsonvue/chklaanhfefbnpoihckbnefhakgolnmc) or other JSON formatting extension
