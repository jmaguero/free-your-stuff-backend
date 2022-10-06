const { Router } = require("express");
const authMiddleware = require("../auth/middleware");
const Product = require("../models").product;

const router = new Router();


//get all products 
router.get("/", async (req, res, next) => {
  try {

    const products = await Product.findAll();
    if (!products) {
      return res.status(404).send({
        message: "No products found",
      });
    }
    return res.status(200).send(products);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

//get product by ID 
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id
    const product = await Product.findOne({ where: { id: id } });
    if (!product) {
      return res.status(404).send({
        message: "No products found",
      });
    }
    return res.status(200).send(product);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});


module.exports = router;