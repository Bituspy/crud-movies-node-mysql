import express from "express";
import mysql from "mysql";
import cors from "cors";


//establish database connection
const db = mysql.createConnection({
  host: "localhost",
  port : 3308, // 3306 by default for mysql
  user: "root",
  password: "",
  database: "test",
});

// Create express app
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Welcome to the movies API.\nPlease use /movies to access the movies.");
});

// Read movies
app.get("/movies", (req, res) => {
  const sql_query =  "SELECT * FROM movies";
  db.query(sql_query, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

// Read movie by id
app.get("/movies/:id", (req, res) => {
  const bookId = req.params.id;
  const sql_query =  "SELECT * FROM movies WHERE id = ?";
  db.query(sql_query, [bookId], (err, data) => {
    
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});


// Create movies
app.post("/movies", (req, res) => {
  const sql_query =  "INSERT INTO movies(`title`, `description`, `release_date`, `genre`,`director`) VALUES (?)";

  const reqbody_values = [
    req.body.title,
    req.body.description,
    req.body.release_date,
    req.body.genre,
    req.body.director,
  ];

  db.query(sql_query, [reqbody_values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

// Delete movie by id
app.delete("/movies/:id", (req, res) => {
  const bookId = req.params.id;
  const sql_query =  " DELETE FROM movies WHERE id = ? ";

  db.query(sql_query, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

// Update movie by id
app.put("/movies/:id", (req, res) => {
  const bookId = req.params.id;
  const sql_query =  "UPDATE movies SET `title`= ?, `description`= ?, `release_date`= ?, `genre`= ?, `director`=? WHERE id = ?";

  const reqbody_values = [
    req.body.title,
    req.body.description,
    req.body.release_date,
    req.body.genre,
    req.body.director
  ];

  db.query(sql_query, [...reqbody_values,bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

// Server listening on port 3000
app.listen(3000, () => {
  console.log("Listening on port 3000.");
});


