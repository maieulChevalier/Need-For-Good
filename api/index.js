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

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.post("/api/user", async (req, res) => {
  try {
    const user = await usersCollection.findOne({
      userName: req.body.userName,
    });
    try {
      if (user === null) {
        const inserted = await usersCollection.insertOne({
          userName: req.body.userName,
          gamesHistory: [],
        });
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

app.listen(process.env.PORT, () => {
  console.log(`Server Started at ${process.env.PORT}`);
});

module.exports = app;
