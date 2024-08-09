const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");
const { findAll } = require("../../models/Category");

router.get("/", async (req, res) => {
  try {
    const getTags = await Tag.findAll({
      include: [
        {
          model: Product,
          as: "products",
          through: {
            attributes: [],
          },
        },
      ],
    });

    res.status(200).json(getTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, as: "products" }],
    });

    if (!tag) {
      res.status(404).json({ message: "No tag found" });
      return;
    }

    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
  Tag.create(req.body)
    .then((tag) => {
      res.json(tag);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/:id", (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedTag) => {
      res.json(updatedTag);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.delete("/:id", (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTag) => {
      res.json(deletedTag);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
