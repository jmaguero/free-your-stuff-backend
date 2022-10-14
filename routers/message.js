const { Router } = require("express");
const authMiddleware = require("../auth/middleware");
const Chat = require("../models").chat;
const Message = require("../models").message;
const Product = require("../models").product;
const User = require("../models").user
const { Op } = require("sequelize")

const router = new Router();

//TODO include the other user

//get user's messages
router.get("/me/messages", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.user
    console.log(req.user)
    const getUserMessages = await Chat.findAll({
      where: {
        [Op.or]: [
          {
            user1: id
          },
          {
            user2: id
          }
        ],
      },
      include: [Product, Message, User]
    });
    if (id) {
      if (!getUserMessages) {
        return res.status(404).send({
          message: "No message found",
        });
      }
      return res.status(200).send(getUserMessages);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

router.get("/me/messages", async (req, res, next) => {
  try {
    const getUserMessages = await Message.findAll();
    console.log(getUserMessages)
    return res.status(200).send(getUserMessages);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

module.exports = router;