const Clarifai = require("clarifai");
require("custom-env").env();

const app = new Clarifai.App({
  apiKey: `${process.env.API_KEY}`,
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch(() => res.status(400).json("unable to work with api"));
};

const handleImage = (db) => (req, res) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch(() => res.status(400).json("unable to get entries"));
};

module.exports = {
  handleImage,
  handleApiCall,
};