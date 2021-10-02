const express = require("express");
const { db } = require("../knex/knex.js");

const setupServer = () => {
  const app = express();
  app.use(express.json()); // Used to parse JSON bodies
  app.use(express.urlencoded()); // Parse URL-encoded bodies
  app.use(express.static("./public"));

  // GET /media-library/MEDIA
  // It should return the full list of selected media type
  // It is able to take a query parameter limit=n
  //that makes the endpoint only return the first n media items

  app.get("/media-library/movies", async (req, res) => {
    try {
      const movies = await db.select().table("movies"); // Assigning the string from 'movies' table from knex database
      res.status = 200;
      if (req.query.limit !== undefined) {
        console.log(req.query);
        res.json(movies.slice(0, req.query.limit));
      } else res.json(movies);
    } catch (err) {
      console.error("Error loading movies", err);
      res.sendStatus(500);
    }
  });

  app.get("/media-library/books", async (req, res) => {
    try {
      const books = await db.select().table("books");
      res.status = 200;
      if (req.query.limit !== undefined) {
        console.log(req.query);
        res.json(books.slice(0, req.query.limit));
      } else res.json(books);
    } catch (err) {
      console.error("Error loading books", err);
      res.sendStatus(500);
    }
  });

  app.get("/media-library/albums", async (req, res) => {
    try {
      const books = await db.select().table("albums");
      res.status = 200;
      if (req.query.limit !== undefined) {
        console.log(req.query);
        res.json(books.slice(0, req.query.limit));
      } else res.json(books);
    } catch (err) {
      console.error("Error loading books", err);
      res.sendStatus(500);
    }
  });

  // POST /find-media

  app.post("/find-media", async (req, res) => {
    console.log("Trying to find media...");
    console.log("Title: " + req.body.find_titlr);
    console.log("Media Type: " + req.body.media_type);
    const type = req.body.media_type;
    const title = req.body.add_title;
    const artist = req.body.add_artist;
    let media = "Media not found";

    try {
      if (type === "album" || type === "Album") {
        media = await db.select().table("albums")
        .where('title','=',title).orWhere('artist', '=', artist);
        res.status = 200;
      } else if (type === "book" || type === "Book") {
        media = await db.select().table("books")
        .where('title','=',title).orWhere('author', '=', artist);
        res.status = 200;
      } else if (type === "movie" || type === "Movie") {
        media = await db.select().table("movies")
        .where('title','=',title).orWhere('director', '=', artist);
        res.status = 200;
      }
    } catch (err) {
      console.error("Error finding media", err);
      res.sendStatus(500);
    }
    console.log(req.body);
    res.json(media);
  });

  // POST /add-media

  app.post("/add-media", async (req, res) => {
    console.log("Trying to add media...");
    console.log("Title: " + req.body.add_title);
    console.log("Media Type: " + req.body.media_type);
    const type = req.body.media_type;
    const title = req.body.add_title;
    const artist = req.body.add_artist;
    const year = req.body.add_year;
    const genre = req.body.add_genre;
    const status = req.body.add_status;
    let media = "Media not found";

    try {
      if (type === "album" || type === "Album") {
        media = await db("albums").insert({
          title: title,
          artist: artist,
          released: year,
          genre: genre,
          listened: status,
        }).then(data => res.status(200).json('Success'));
      } else if (type === "book" || type === "Book") {
        media = await db("books").insert({
          title: title,
          author: artist,
          published: year,
          genre: genre,
          read: status,
        }).then(data => res.status(200).json('Success'));
      } else if (type === "movie" || type === "Movie") {
        media = await db("movies").insert({
          title: title,
          director: artist,
          release: year,
          genre: genre,
          watched: status,
        }).then(data => res.status(200).json('Success'));
      }
    } catch (err) {
      console.error("Error adding media", err);
      res.sendStatus(500);
    }
    res.json(media);
  });

  // POST /update-media

  app.post("/update-media", async (req, res) => {
    console.log("Trying to update media...");
    console.log("Title: " + req.body.add_title);
    console.log("Media Type: " + req.body.media_type);
    const type = req.body.media_type;
    const title = req.body.add_title;
    const artist = req.body.add_artist;
    const year = req.body.add_year;
    const genre = req.body.add_genre;
    const status = req.body.add_status;
    let media = "Media not found";

    try {
      if (type === "album" || type === "Album") {
        media = await db("albums")
        .where('title','=',title)
        .update({
          title: title,
          artist: artist,
          released: year,
          genre: genre,
          listened: status,
        }).then(data => res.status(200).json('Success'));
      } else if (type === "book" || type === "Book") {
        media = await db("books")
        .where('title','=',title)
        .update({
          title: title,
          author: artist,
          published: year,
          genre: genre,
          read: status,
        }).then(data => res.status(200).json('Success'));
      } else if (type === "movie" || type === "Movie") {
        media = await db("movies")
        .where('title','=',title)
        .update({
          title: title,
          director: artist,
          release: year,
          genre: genre,
          watched: status,
        }).then(data => res.status(200).json('Success'));
      }
    } catch (err) {
      console.error("Error updating media", err);
      res.sendStatus(500);
    }
  });

  // POST /remove-media

  app.post("/remove-media", async (req, res) => {
    console.log("Trying to remove media...");
    console.log("Title: " + req.body.add_title);
    console.log("Media Type: " + req.body.media_type);
    const type = req.body.media_type;
    const title = req.body.add_title;
    let media = "Media not found";

    try {
      if (type === "album" || type === "Album") {
        media = await db("albums")
        .where('title','=',title)
        .del().then(data => res.status(200).json('Success'));
      } else if (type === "book" || type === "Book") {
        media = await db("books")
        .where('title','=',title)
        .del().then(data => res.status(200).json('Success'));
      } else if (type === "movie" || type === "Movie") {
        media = await db("movies")
        .where('title','=',title)
        .del().then(data => res.status(200).json('Success'));
      }
    } catch (err) {
      console.error("Error deleting media", err);
      res.sendStatus(500);
    }
  });

  return app;
};

module.exports = { setupServer };
