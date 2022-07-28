const express = require("express");
require("dotenv").config();
var cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.DATABASE_URL;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

client.connect();
const usersCollection = client.db("need-for-good").collection("users");

usersCollection.createIndex(
  { userName: 1 },
  {
    collation: {
      locale: "fr",
      strength: 2,
    },
  }
);

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.post("/api/user", async (req, res) => {
  console.log("body: ", req.body);
  try {
    const users = await usersCollection
      .find({ userName: req.body.userName }) // must use find and collation with index to perform case insensitive search
      .collation({ locale: "en", strength: 2 })
      .limit(1)
      .toArray();

    console.log("users: ", users);

    try {
      if (users.length === 0) {
        const inserted = await usersCollection.insertOne({
          userName: req.body.userName,
          gamesHistory: [],
        });
        console.log("inserted: ", inserted);
      }
    } catch (error) {
      console.log("Could not insert due to " + error);
    }

    res.send(req.body.userName);
  } catch (err) {
    console.log("error: ", err);
  }
});

app.post("/api/user/games-history", async (req, res) => {
  try {
    const user = await usersCollection.findOneAndUpdate(
      { userName: req.body.userName },
      {
        $push: {
          gamesHistory: {
            date: new Date(),
            userProgressionRate: req.body.progressionRate,
            computerProgressionRate: req.body.computerProgressionRate,
          },
        },
      },
      {
        returnNewDocument: true,
      }
    );

    console.log("user: ", user);
    res.send(req.body.userName);
  } catch (err) {
    console.log("error: ", err);
  }
});

app.get("/api/user/games-history", async (req, res) => {
  try {
    const user = await usersCollection.findOne({
      userName: req.query.userName,
    });

    res.send(user);
  } catch (err) {
    console.log("error: ", err);
  }
});
// //Post Method
// app.post("/api/post", (req, res) => {
//   res.send("Post API");
// });

// //Get all Method
// app.get("/api/getAll", (req, res) => {
//   res.send("Get All API");
// });

// //Get by ID Method
// app.get("/api/getOne/:id", (req, res) => {
//   res.send("Get by ID API");
// });

// //Update by ID Method
// app.patch("/api/update/:id", (req, res) => {
//   res.send("Update by ID API");
// });

// //Delete by ID Method
// app.delete("/api/delete/:id", (req, res) => {
//   res.send("Delete by ID API");
// });

app.listen(process.env.PORT, () => {
  console.log(`Server Started at ${process.env.PORT}`);
});

module.exports = app;
