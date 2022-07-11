const express = require("express");
const router = express.Router();
const { User } = require("../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const app = express(); 
const cors = require('cors');
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
//const LoginController = require('../controllers/LoginController');

//const loginController = new LoginController();

app.use(cors());

router.get("/login", (req, res) => {
  return res.send("You have called a login route");
});

router.get("/login/user", async (req, res) => {
  try{
    const results = 
    await User.findAll();
    console.table(JSON.parse(JSON.stringify(results)));
    return res.send(JSON.stringify(results));
  }catch (err) {
    console.log(err);
  }
  return res.send("You have called a login route");
});

//router.post("/login/signup", loginController.create);

router.post("/login/signup", async (req, res) => {
  const newUser = req.body;

  if (!newUser.username) {
    res.status(500);
    res.send("Username is required.");
    return;
  }

  if (!newUser.email) {
    res.status(500);
    res.send("User email is required.");
    return;
  }
  if (!newUser.password) {
    res.status(500);
    res.send("User password is required.");
    return;
  }

  const plainText = newUser.password;
  bcrypt.hash(plainText, saltRounds, function (err, hash) {
    // A callback function called after hash() completes.
    if (err) {
      console.error(err);
      return;
    }
    console.log(hash);

    newUser.hash = hash;

    const hashedValue = hash;
    bcrypt.compare(plainText, hashedValue, function (err, result) {
      //console.log(`compare ${plainText} against ${hashedValue}`);
      if (err) {
        console.error(err);
        return;
      }

      console.log(result);
    });

    User.create({
      username: newUser.username,
      email: newUser.email,
      password: newUser.hash,
    }).then(() => {
      res.status(200).send({ message: "New user is created!" });
    });
  });
});

router.post("/login/signin", async (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compare(req.body.password, user.password);

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: token,
      });
      console.log(token)
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });

  
});




module.exports = router;
