const { Router } = require("express");
const Category = require("../models").category;

const router = new Router();


//Get categories
router.get("/", async (req, res, next) => {
  try {
    const getCategories = await Category.findAll();
    if (getCategories) {
      return res.status(200).send({ categories: getCategories, message: "Ok" })
    }
    else {
      return res.status(400).send({ message: "Something went wrong, sorry" });
    }

  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
})


module.exports = router;