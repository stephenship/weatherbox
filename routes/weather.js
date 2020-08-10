const express = require("express");
const router = express.Router();
const { Weather } = require("../models");
const { http } = require("../helpers");
const { validate } = require("../middleware");

router.get("/weather", async (req, res, next) => {
  const weatherData = await Weather.findAll({
    order: [['city', 'ASC']]
  });

  if (weatherData) {
    return res.status(200).send(http.response(true, weatherData));
  }

  return res.status(200).send(http.response(false, "No weather data found."));
});

router.post("/weather", validate.weather, async (req, res, next) => {
  const [entry, created] = await Weather.findOrCreate({
    where: { // see if a entry already exists
      city: req.body.city,
    },
    // add if entry doesn't exist
    defaults: {
      city: req.body.city,
      time: req.body.time,
      temperature: req.body.temperature
    }
  });

  if (!created) {
    // update time and temperature of the city
    entry.time = req.body.time || new Date(); // defaults to now
    entry.temperature = req.body.temperature || 0; // default to 0
    let saved = await entry.save();

    if (saved) {
      return res.status(200).send(http.response(true, "Weather data updated."));
    }
    return res.status(200).send(http.response(false, "Please try again."));
  }

  return res.status(200).send(http.response(true, 'Weather data added.'));
});

router.delete("/weather/:city", validate.city, async (req, res, next) => {
  const existing = await Weather.findOne({
    where: { // see if a entry already exists
      city: req.params.city
    }
  });

  if (existing) {
    await existing.destroy();
    return res.status(200).send(http.response(true, 'Weather data removed successfully.'));
  }

  return res.status(200).send(http.response(false, 'Weather data not found.'));
});

module.exports = router;
