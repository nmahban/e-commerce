const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  try {
    const categories = Category.findAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json(err);
  }

  // find all categories
  // be sure to include its associated Products
});

router.get("/:id", (req, res) => {
  try {
    const category = Category.findByPk(req.params.id, {
      include: [Product],
    });
    res.json(category);
  } catch (err) {
    res.status(500).json(err);
  } // find one category by its `id` value
  // be sure to include its associated Products
});

router.post("/", (req, res) => {
  try {
    const category = Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json(err);
  }

  // create a new category
});

router.put("/:id", (req, res) => {
  try {
    const category = Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json(category);
  } catch (err) {
    res.status(400).json(err);
  }

  // update a category by its `id` value
});

router.delete("/:id", (req, res) => {
  try {
    const category = Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(category);
  } catch (err) {
    res.status(500).json(err);
  } // delete a category by its `id` value
});

module.exports = router;
