const mongoose = require("mongoose");
const ejs = require("ejs");
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method}: ${req.path}`);
  next();
});

const mongoDBConnectionString =
  "mongodb+srv://SE12:CSH2024@cluster0.anz6v6s.mongodb.net/?retryWrites=true&w=majority&appName=cluster0";

mongoose
  .connect(mongoDBConnectionString)
  .then(() => {
    console.log("MongoDB connection successful.");
  })
  .catch((err) => console.log("MongoDB connection error:", err));

// START OF 'GET' ROUTES FOR WEBSITE PAGES
app.get("/aboutus", (req, res) => {
  res.status(200).sendFile(__dirname + "/public/aboutus.html");
});

app.get("/addEvent", (req, res) => {
  res.status(200).sendFile(__dirname + "/public/addEvent.html");
});

app.get("/", (req, res) => {
  res.status(200).render(__dirname + "/views/home.ejs");
});

app.get("/game", (req, res) => {
  Game.find({}).then((data) => {
    res.status(200).render("game.ejs", { games: data });
  });
});
app.get("/event", (req, res) => {
  Event.find({}).then((data) => {
    res.status(200).render("event.ejs", { events: data });
  });
});

app.get("/admin", (req, res) => {
  Member.find({}).then((data) => {
    res.status(200).render("admin.ejs", { members: data });
  }).catch(err => {
    console.log(err);
    res.status(500).send("Error retrieving members.");
  });
});

app.get("/addMembers", (req, res) => {
  res.status(200).sendFile(__dirname + "/public/addMembers.html");
});

app.get("/addEvents", (req, res) => {
  res.status(200).sendFile(__dirname + "/public/addEvents.html");
});

app.get("/updateMembers", (req, res) => {
  res.status(200).sendFile(__dirname + "/public/addMembers.html");
});
// END OF 'GET' ROUTES FOR WEBSITE PAGES

// Schema and model for GAMING CLUBS MEMBERS

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gamertag: { type: String, required: true },
  grade: { type: String, required: true },
  favoriteGame: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game",
  },
  eventsGoing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Events",
  },
});
const Member = mongoose.model("Member", memberSchema);

app.get("/member", (req, res) => {
  Member.find({}).then((data) => {
    res.render("member.ejs", { members: data });
  });
});

// Schema and model for GAMES

const gamesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  description: { type: String, required: false },
  playedbyclub: { type: Boolean, required: true },
});
const Game = mongoose.model("Game", gamesSchema);

// Schema and model for EVENTS

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  host: { type: String,  },
  description: { type: String, required: true },
  date: { Number, type: String, },
  time: { type: String, },
});

const Event = mongoose.model("Event", eventSchema);

// Find all GAMING CLUB MEMBERS

app.get("/members", (req, res) => {
  Member.findOne({}).then((data) => {
    res.json(data);
  });
});

// Create a GAMING CLUB MEMBER

app.post("/members", (req, res) => {
  const newMember = new Member({
    name: req.body.name,
    gamertag: req.body.gamertag,
    grade: req.body.grade,
    // favoriteGame: req.body.favoriteGame,
  });
  console.log(newMember)
  newMember.save()
    .then((member) => res.json(member))
    .catch((err) => console.log(err))
});



// Update and return an existing member
app.post("/members/:gamertag", (req, res) => {
  Member.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedMember) => {
      res.json(updatedMember);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: "Error updating member" });
    });
});
// Find all GAMES

app.get("/games", (req, res) => {
  Game.find({}).then((data) => {
    res.json(data);
  });
});

// Create a GAME

app.post("/games", (req, res) => {
  const newGame = new Game({
    title: req.body.title,
    genre: req.body.genre,
    description: req.body.description,
  });
  newGame.save().then((game) => res.json(game));
});

// Find all Events

app.get("/events", (req, res) => {
  Event.findOne({}).then((data) => {
    res.json(data);
  });
});
// Create a EVENT
app.post("/Events", (req, res) => {
  const newEvent = new Event({
    title: req.body.title,
    host: req.body.host,
    description: req.body.description,
     date: req.body.date,
     time: req.body.time
    });
    // 
  console.log(newEvent)
  newEvent.save()
    .then((event) => res.json(event))
    .catch((err) => console.log(err))
});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});
