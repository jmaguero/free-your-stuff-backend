const { Router } = require("express");
const authMiddleware = require("../auth/middleware");
const Product = require("../models").product;
const { Op } = require("sequelize")

const router = new Router();


//get all products 
router.get("/", async (req, res, next) => {
  try {
    const { term } = req.query

    if (term) {
      if (term.length > 0) {
        const products = await Product.findAll({
          where: {
            [Op.or]: [
              {
                name:
                  { [Op.substring]: term }
              },
              {
                description:
                  { [Op.substring]: term }
              }
            ],
            [Op.and]: [{ isAvailable: true }]
          }
        });
        return res.status(200).send(products);
      }
    } else {
      const products = await Product.findAll({ where: { isAvailable: true } });
      if (!products) {
        return res.status(404).send({
          message: "No products found",
        });
      }
      return res.status(200).send(products);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});


//post a new product
router.post("/post", authMiddleware, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { product } = req.body
    const postProduct = await Product.create({ ...product, userId: userId })
    res.status(200).send({ postProduct, message: "Product posted" })

  } catch (error) {
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }

})

//get user's products
router.get("/me", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.user
    console.log("UserID", id)
    if (id) {
      const getUserProducts = await Product.findAll({ where: { userId: id } });
      if (!getUserProducts) {
        return res.status(404).send({
          message: "No products found",
        });
      }
      return res.status(200).send(getUserProducts);
    }
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

//delete product by ID 
router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const id = req.params.id
    const userId = req.user.id
    const destroyProduct = await Product.destroy({ where: { id: id, userId: userId } });
    if (!destroyProduct) {
      return res.status(404).send({
        message: "You're not allowed to delete other's product",
      });
    } else {
      const getUserProducts = await Product.findAll({ where: { userId: userId } })
      return res.status(200).send({ message: "Product deleted", userProducts: getUserProducts, deletedProduct: destroyProduct });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

//update product availability by ID 
router.patch("/:id", authMiddleware, async (req, res, next) => {
  try {
    const id = req.params.id
    const userId = req.user.id
    //remover createdAt from object
    delete req.body.createdAt;
    const newParams = req.body;
    //request validates itself if user is also owner
    const findProduct = await Product.findOne({ where: { id: id, userId: userId } });
    const updateProduct = await findProduct.update({ ...newParams });
    if (!findProduct) {
      return res.status(404).send({
        message: "You're not allowed to delete other's product",
      });
    } else {
      const getUserProducts = await Product.findAll({ where: { userId: userId } })
      return res.status(200).send({ message: "Product updated", updatedProduct: updateProduct, products: getUserProducts });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});
module.exports = router;