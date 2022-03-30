const router = require('express').Router();
const { Category, Product, Tag, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const catData = await Category.findAll({
      include: [
        { model: Product, include: { model:Tag, through: ProductTag } }
        ]
    });
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const singleCatData = await Category.findByPk(req.params.id, {
      include: [
        { model: Product, include: { model:Tag, through: ProductTag } }
        ]
    });

    if (!singleCatData) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }

    res.status(200).json(singleCatData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCatData = await Category.create(req.body);
    res.status(200).json(newCatData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id/:category_name', async (req, res) => {
  // update a category by its `id` value
  try {

    const singleCatData = await Category.update(
      {
        category_name: req.params.category_name,
      },
      {where: {
        id: req.params.id}
      }
    );

      if (singleCatData[0] !== 1) {
      res.status(404).json({ message: 'No CATEGORY found with this id!' });
      return;
      };

    res.status(200).json(singleCatData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const singleCatData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!singleCatData) {
      res.status(404).json({ message: 'No CATEGORY found with this id!' });
      return;
    }

    res.status(200).json(singleCatData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
