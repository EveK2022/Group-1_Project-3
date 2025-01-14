const express = require("express");
const router = express.Router();
const { Location } = require("../models");
const { User } = require("../models")
const LocationController = require("../controllers/LocationController");
const ReviewController = require("../controllers/ReviewController");

const locationController = new LocationController();
const reviewController = new ReviewController();

router.get("/user", (req, res) => {
  return res.send("You have called a user route");
});

router.get(
  "/user/location/:id",
  async (req, res) => {
    try {
      const results = await Location.findAll({
        where: { id: req.params.id }
      });
      console.table(JSON.parse(JSON.stringify(results)));
      return res.send(JSON.stringify(results));
    } catch (err) {
      console.log(err);
    }
  }
);

router.post("/user/signout", function(req, res) {

  res.status(200).send({

    accessToken : null,
  });
});

router.post("/user/newreview", reviewController.create);

router.post("/user/newlocation", locationController.create);
router.put("/user/location", locationController.update);
router.delete("/user/location/:locationId", locationController.delete);

module.exports = router;
