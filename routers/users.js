const { Router } = require("express");
const authMiddleware = require("../auth/middleware");;
const Users = require("../models/").user


const router = new Router();


// Table reservation endpoint
router.post("/", authMiddleware, async (req, res, next) => {

  const { email } = req.body
  console.log(email)

  //check if user is admin
  if (req.user.isAdmin === false) {
    return res.status(403).send({ status: "Forbidden", message: "Not allowed to perform this action" })
  }
  try {
    const findUser = await Users.findOne({ where: { email: email } });
    if (findUser) {
      const blockUser = await findUser.update({ accountBlocked: !findUser.dataValues.accountBlocked });
      if (blockUser) {
        return res.status(200).send({ status: "ok", message: "User blocked" })
      } else {
        return res.status(400).send({ message: "Sorry, we couldn't process your reserve, try again" })
      }
    } else {
    }
  } catch (error) {
    next(error)
  }
});


// Get reserved tables endpoint
router.get("/", authMiddleware, async (req, res, next) => {
  try {
    if (req.user.isAdmin === false) {
      return res.status(403).send({ status: "Forbidden", message: "Not allowed to perform this action" })
    }
    const getUsers = await Users.findAll({
      attributes: ['name', 'email', "accountBlocked"]
    });
    if (getUsers.length > 0) {
      return res.status(200).send(getUsers)
    } else {
      return res.status(400).send({ status: "Failed", message: "No users found" })
    }

  } catch (error) {
    next(error)
  }
});

module.exports = router;