const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const userSchema = require("../models/users");
const { check, validationResult } = require("express-validator");
const auth = require("../middlewares/auth");


router.get("/", auth, async (req, res) => {
  try {
    const user = await userSchema.findById(req.user.userId).select("password");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});


router.post("/signin-user", (req, res) => {
  let getUser;
 
  userSchema
    .findOne({
      email: req.body.email,
    })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Authentication failed",
        });
      }
      getUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((response) => {
      if (!response) {
        return res.status(401).json({
          message: "Authentication failed",
        });
      }

      payload = {
        user: {
          email: getUser.email,
          userId: getUser._id,
        },
      };

      let jwtToken = jwt.sign(payload, "longer-secret-is-better", {
        expiresIn: "1h",
      });
      return res.status(200).json({
        token: jwtToken,
      });
    })
    .catch((err) => {
      res.status(401).json({
        message: "Authentication failed",
      });
    });
});


router.post(
  "/register-user",
  [
    check("name")
      .not()
      .isEmpty()
      .isLength({ min: 4 })
      .withMessage("Name must be atleast  characters long"),
    check("email", "Email is not valid").not().isEmpty().isEmail(),
    check("password", "Password should be between 5 to 8 characters long")
      .not()
      .isEmpty()
      .isLength({ min: 5, max: 8 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array());
    } else {
      bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new userSchema({
          name: req.body.name,
          email: req.body.email,
          password: hash,
        });

        user
          .save()
          .then((response) => {
            if (!response) {
              return res.status(401).json({
                message: "Authentication failed",
              });
            }

            
            payload = {
              user: {
                email: user.email,
                userId: user._id,
              },
            };
            
            let jwtToken = jwt.sign(payload, "longer-secret-is-better", {
              expiresIn: "1h",
            });
            
            return res.status(200).json({
              token: jwtToken,
            });
          })

          .catch((error) => {
            res.status(500).json({
              error: error,
            });
            console.log(error);
          });
      });
    }
  }
);


module.exports = router;
