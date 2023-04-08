import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const URL =
  "mongodb+srv://admin:123@cluster0.sjmbfuk.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(URL);

client.connect().then(() => {
  console.log("Connected!");
  app.listen(8000, () => {
    console.log("listening port 8000");
  });
});

app.get("/", async (req, res) => {
  res.json(await getStreamers());
});

app.get("/:streamer", async (req, res) => {
  const { streamer } = req.params;

  res.json(await getStreamer(streamer));
});

app.post("/post", async (req, res) => {
  const {
    streamer,
    watchTime,
    streamTime,
    peakViewers,
    averageViewers,
    followers,
    followerGained,
    viewsGained,
    partnered,
    mature,
    language,
  } = req.body;
  console.log(req.body);
  res.json(
    await postStreamer(
      streamer,
      Number(watchTime),
      Number(streamTime),
      Number(peakViewers),
      Number(averageViewers),
      Number(followers),
      Number(followerGained),
      Number(viewsGained),
      Boolean(partnered),
      Boolean(mature),
      language
    )
  );
});

app.put("/put", async (req, res) => {
  const { streamer, team } = req.body;
  res.json(await putTeam(streamer, team));
});

app.delete("/delete/:streamer", async (req, res) => {
  const { streamer } = req.params;
  res.json(await deleteStreamer(streamer));
});

app.get("/getSpec/:streamer", async (req, res) => {
  const { streamer } = req.params;
  res.json(await getSpecStreamer(streamer));
});

async function getSpecStreamer(streamer) {
  const result = await client
    .db("twitch")
    .collection("streamer")
    .find({
      $or: [
        { Channel: { $regex: `^${streamer}`, $options: "i" } },
        { Language: { $regex: `^${streamer}`, $options: "i" } },
        { team: { $regex: `^${streamer}`, $options: "i" } },
      ],
    })
    .toArray();
  return result;
}

async function deleteStreamer(streamer) {
  const result = await client
    .db("twitch")
    .collection("streamer")
    .deleteOne({ Channel: streamer });
  return result;
}

async function putTeam(streamer, team) {
  const result = await client
    .db("twitch")
    .collection("streamer")
    .updateOne({ Channel: streamer }, { $set: { team: team } });
  return result;
}

async function getStreamers() {
  const result = await client
    .db("twitch")
    .collection("streamer")
    .find({})
    .toArray();
  return result;
}

async function getStreamer(streamer) {
  const result = await client
    .db("twitch")
    .collection("streamer")
    .find({ Channel: streamer })
    .toArray();
  return result;
}

async function postStreamer(
  streamer,
  watchTime,
  streamTime,
  peakViewers,
  averageViewers,
  followers,
  followerGained,
  viewsGained,
  partnered,
  mature,
  language
) {
  const result = await client.db("twitch").collection("streamer").insertOne({
    Channel: streamer,
    "Watch time(Minutes)": watchTime,
    "Stream time(minutes)": streamTime,
    "Peak viewers": peakViewers,
    "Average viewers": averageViewers,
    Followers: followers,
    "Followers gained": followerGained,
    "Views gained": viewsGained,
    Partnered: partnered,
    Mature: mature,
    Language: language,
  });
  return result;
}
